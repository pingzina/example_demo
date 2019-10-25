const util = {
  title (title) {
    const dTitle = title || '极果服务平台'
    window.document.title = dTitle
  },
  getRouterObjByName (routers, name) {
    if (!name || !routers || !routers.length) {
      return null
    }
    // debugger;
    let routerObj = null
    for (let item of routers) {
      if (item.name === name) {
        return item
      }
      routerObj = util.getRouterObjByName(item.children, name)
      if (routerObj) {
        return routerObj
      }
    }
    return null
  },
  toDefaultPage (routers, name, route, next) {
    let len = routers.length
    let i = 0
    let notHandle = true
    while (i < len) {
      if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
        const replaceName = routers[i].children.filter(item => !item.hidden)[0].name
        route.replace({
          name: replaceName
        })
        notHandle = false
        next()
        break
      }
      i++
    }
    if (notHandle) {
      next()
    }
  },
  includeInArray (arr1, arr2) {
    let icd = false
    for (let i of arr1) {
      if (arr2.includes(i)) {
        icd = !icd
        break
      }
    }
    return icd
  },
  countDown (self, allTime, changeBack, callBack) {
    let displayTime, that = this

    function showTime () {
      const timeData = that.formatTime1(allTime)
      allTime -= 1
      changeBack && changeBack.call(self, timeData)
    }

    showTime()
    displayTime = setInterval(function () {
      showTime()
      if (allTime == -1) {
        clearInterval(displayTime)
        callBack && callBack.call(self)
        return
      }
    }, 1000)
    return displayTime
  },
  timerCounter (self, allTime, changeBack, maxTime, callBack) {
    let displayTime, that = this

    function showTime () {
      const timeData = that.formatTime1(allTime)
      allTime += 1
      changeBack && changeBack.call(self, timeData)
    }

    showTime()
    displayTime = setInterval(function () {
      showTime()
      if (allTime > maxTime) {
        clearInterval(displayTime)
        callBack && callBack.call(self)
        return
      }
    }, 1000)
    return displayTime
  },
  formatTime1 (allTime) {
    let day = Math.floor(allTime / (60 * 60 * 24))
    let hour = Math.floor(allTime / (3600)) - (day * 24)
    let minute = Math.floor(allTime / (60)) - (day * 24 * 60) - (hour * 60)
    let second = Math.floor(allTime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
    if (hour <= 9) hour = '0' + hour
    if (minute <= 9) minute = '0' + minute
    if (second <= 9) second = '0' + second
    return {
      d: day,
      h: hour,
      m: minute,
      s: second
    }
  },
  //格式化时间戳
  formatTime ({
    d,
    h,
    m,
    s
  }) {
    let timestamp = ''
    if (d > 0) {
      timestamp = `${d}天${h}时${m}分${s}秒`
    } else if (h > 0) {
      timestamp = `${h}时${m}分${s}秒`
    } else if (m > 0) {
      timestamp = `${m}分${s}秒`
    } else if (s >= 0) {
      timestamp = `${s}秒`
    }
    return timestamp
  },
  trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  randomId () {
    return 'id-' + (new Date().getTime()) + '' + (Math.random() + '').replace('.', '')
  },
  getLen (str) {
    if (str == null) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
  },
  subStr (str, start, len) {
    const strArr = str.split('')
    let realLen = 0
    for (var i = 0; i <= strArr.length - 1; i++) {
      if (start > i) {
        continue
      }
      (/[\u4e00-\u9fa5]/.test(strArr[i])) ? len -= 2 : len--
      if (len - 1 < 0) {
        realLen = i
        break
      }
    }
    return str.substr(start, realLen)
  },
  setSession (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  getSession (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  removeSession (key) {
    localStorage.removeItem(key)
  },
  isPermission (id, list) {
    for (let i in list) {
      if (list[i].rules) {
        let rules = list[i].rules
        for (let j in rules) {
          if (rules[j].id == id && rules[j].checked == 'true') {
            return true
          }
        }
      }
    }
    return false
  },
  //序列化成数组输出
  transformArray (ids) {
    if (Array.isArray(ids)) {
      ids = ids
    } else {
      let ids_arr = []
      ids_arr.push(ids)
      ids = ids_arr
    }
    return ids
  },
  //函数防抖
  debounce (func, wait, immediate) {
    let last
    return function () {
      let that = this,
        args = arguments
      if (immediate) {
        func.apply(that, args)
      }
      if (last) {
        clearTimeout(last)
      }
      last = setTimeout(function () {
        func.apply(that, args)
      }, wait)
    }
  },
  //函数节流
  throttle (func, wait) {
    let last = 0
    return function () {
      let cur = +new Date()
      if (cur - last >= wait) {
        func.apply(this, arguments)
        last = cur
      }
    }
  },
  //跳转到指定页面
  toLink (router, path, blank) {
    if (blank) {
      let targetUrl = router.resolve({
        path: path
      })
      window.open(targetUrl.href, '_blank')
    } else {
      router.push(path)
    }
  },
  //下载图片地址和图片名
  downloadImage (imgSrc, name) {
    const image = new Image()
    //设置跨域
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
      //创建下载路径
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      const url = canvas.toDataURL('images/png')

      name = name || this.randomId()
      this.saveFile(url, name)
    }
    image.src = imgSrc
  },
  saveFile (url, name) {
    //创建a标签
    const a = document.createElement('a')
    const event = new MouseEvent('click') //创建鼠标点击事件
    a.download = name //设置下载名称
    a.href = url //设置下载路径
    a.dispatchEvent(event) //触发鼠标点击事件
  },
  //生成随机ID
  randomId () {
    return Math.random().toString().replace('.', '')
  },
  //格式化文件size
  formatSize (size) {
    let sizeStr = ''
    if (!isNaN(size)) {
      if (size / 1024 < 1024) {
        sizeStr = (size / 1024).toFixed(2) + 'Kb'
      } else if (size / 1024 / 1024 < 1024) {
        sizeStr = (size / 1024 / 1024).toFixed(2) + 'Mb'
      } else {
        sizeStr = (size / 1024 / 1024 / 1024).toFixed(2) + 'Gb'
      }
    }
    return sizeStr
  }


}

export default util
