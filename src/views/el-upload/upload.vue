<template>
  <div class="upload">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- <el-form-item> -->
        <!-- <el-row class="ft16">
          奖品图：
          <span class="gray ft14">建议尺寸：1080*540，第一张默认为封面图，最多上传6张产品图片</span>
        </el-row> -->
        <div class="product-pic-list">
          <div class="image" v-for="(item,i) in info.imgs" :key="i">
            <div class="deal-wrap" v-if="typeof item != 'object'">
              <i class="el-icon-delete deal-item" title="删除" @click="delImg(i)"></i>
            </div>
            <i class="el-icon-loading" v-if="typeof item == 'object'"></i>
            <img v-else :src="item" alt />
          </div>

          <!--上传-->
          <el-upload
            v-show="info.imgs.length<6"
            class="uploader"
            action="/php/upload.php"
            accept="image/*"
            :multiple="true"
            :limit="6"
            :show-file-list="false"
            :before-upload="uploadBannerBefore"
            :on-success="uploadBannerSuccess"
          >
            <div class="cover">
              <i class="el-icon-plus"></i>
              <span>添加图片</span>
            </div>
          </el-upload>
        </div>
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
const FILE_LIMIT_SIZE = 2 * 1024 * 1024;

export default {
  data() {
    return {
      form: {},
      info: {
        imgs: []
      },
      showCropper: false
    };
  },
  methods: {
    uploadBannerBefore(file) {
      //上传前的验证
      if (file.size > FILE_LIMIT_SIZE) {
        this.$message.error("上传文件不能超过2MB");
        return false;
      }
      // 添加数据便于后期的图片一一对应，这样不会导致图片顺序出错
      this.info.imgs.push({ uid: file.uid });
    },
    uploadBannerSuccess(response, file, fileList) {
      //图片上传成功后的数据处理
      this.info.imgs.forEach((item, i, arr) => {
        if (item.uid && item.uid == file.uid) {
          if (response.resultCode == "0") {
            arr.splice(i, 1, response.url);
          }else{
            arr.splice(i,i);
            this.$message.error(`文件：${file.name}上传失败`);
          }
        }
      });
    },
    delImg(i) {
      console.log(i);
      this.info.imgs.splice(i, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.product-pic-list {
  display: flex;
  flex-wrap: wrap;
  .image {
    width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-right: 20px;
    margin-bottom: 20px;
    &:hover {
      .deal-wrap {
        display: flex;
      }
    }
    img {
      width: 100%;
    }
    .deal-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: none;
      justify-content: center;
      align-items: center;
    }
    .deal-item {
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #369ad1;
      }
      & + .deal-item {
        margin-left: 20px;
      }
    }
  }
}
.uploader {
  margin-bottom: 20px;
}
.cover {
  width: 200px;
  height: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #dcdfe6;
  color: #999999;
  &:hover {
    color: #369ad1;
    border-color: #369ad1;
  }
}
</style>
