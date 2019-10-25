import OSS from "ali-oss";
import { _getAliYunSts, _saveMaterial } from "@/api/upload";
import util from "@/base/js/util";
//ali-oss文档    https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.6.1274.19027214K0VMuf

const noop = () => { }

export default class {
  constructor({ onProgress, onSuccess, onError }) {
    this.options = {
      internal: true,
      secure: true,
      cname: true,
      endpoint: 'oss.zhidx.com',
      // endpoint: 'zhidx.oss-cn-beijing-internal.aliyuncs.com',
      region: 'oss-cn-beijing', //bucket 所在的区域
      accessKeyId: '<Your AccessKeyId>',  //通过阿里云控制台创建的access key
      accessKeySecret: '<Your AccessKeySecret>',  //通过阿里云控制台创建的access secret
      stsToken: '', //使用临时授权方式，详情请参见使用STS访问
      bucket: 'zhidx' //通过控制台创建的bucket
    }
    this.onProgress = onProgress || noop
    this.onSuccess = onSuccess || noop
    this.onError = onError || noop
  }
  upload (file) {
    this.file = file
    let idx = file.type.indexOf('/')
    this.type = file.type.substr(0, idx)
    if (file.type.indexOf('audio') > -1) {
      Promise.all([this.getAudioDuration(), this.send()]).then(res => {
        res[1].result.duration = res[0]

        this.onSuccess(res[1])
      }).catch(err => {
        console.log('上传错误：' + err)
      })
    } else if (file.type.indexOf('video') > -1) {
      Promise.all([this.getVideoDuration(), this.send()]).then(res => {
        res[1].result.duration = res[0]
        this.onSuccess(res[1])
      }).catch(err => {
        console.log('上传错误：' + err)
      })
    }
  }
  send () {
    return new Promise((resolve) => {
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        m_str = m > 9 ? m : '0' + m,
        ran_str = util.randomId(),
        name = `live/uploads/materials/${y}/${m_str}/${ran_str}-${this.file.name}`
      _getAliYunSts().then(({ result }) => {
        this.options.accessKeyId = result.AccessKeyId
        this.options.accessKeySecret = result.AccessKeySecret
        this.options.stsToken = result.SecurityToken
        this.client = new OSS(this.options)
      }).then(() => {

        this.client.multipartUpload(name, this.file, {
          // headers: { "content-type": "application/json" },
          mime: this.file.type,
          parallel: 10,
          partSize: 0.3 * 1000 * 1024,
          progress: (p, checkpoint) => {
            // 断点记录点。 浏览器重启后无法直接继续上传，需用户手动触发进行设置。
            // tempCheckpoint = checkpoint;
            this.onProgress(p, checkpoint)
          },
        })
          // this.client.put(name, this.file)
          .then(res => {
            // course_id: 171
            // created_at: "2019-09-06 19:44:54"
            // duration: 0
            // id: 116
            // link: "https://oss.zhidx.com/live/uploads/materials/2019/09/5d7246b552056-3.jpeg"
            // name: "3.jpeg"
            // size: "38K"
            // state: 1
            // type: "image"
            // updated_at: "2019-09-06 19:44:54"

            let resultData
            if (res.res.statusCode == 200) {
              let linkIdx = res.res.requestUrls[0].indexOf('?'),
                link = res.res.requestUrls[0].substr(0, linkIdx)

              resultData = {
                resultCode: 1,
                result: {
                  link,
                  size: this.file.size,
                  name: this.file.name,
                  type: this.type
                }
              }
            } else {
              resultData = {
                errorMsg: '上传失败',
                resultCode: 0,
                result: {}
              }
            }
            resolve(resultData)
          }).catch(err => {
            console.log(err);
            this.onError(err)
          })
      })
    })
  }
  getAudioDuration () {
    return new Promise((resolve) => {
      let that = this
      let url = URL.createObjectURL(this.file);
      let audio = new Audio()
      audio.src = url
      audio.load()
      audio.oncanplaythrough = function () {
        that.duration = Math.round(this.duration)
        audio = null
        resolve(that.duration)
      }
    })

  }
  getVideoDuration () {
    return new Promise((resolve) => {
      let that = this
      let url = URL.createObjectURL(this.file);
      let video = document.createElement('video')
      video.src = url
      video.load()
      video.oncanplaythrough = function () {
        that.duration = Math.round(this.duration)
        video = null
        resolve(that.duration)
      }
    })

  }
}