<template>
  <div>
    <!-- tab标签页区域 -->
    <van-tabs v-model="active" @change="getList">
      <van-tab :title="item.title" :key="item.id" v-for="item in photoList" :name="item.id">
        <van-list>
          <van-cell-group style="padding: 0 10px" :key="item.id" v-for="item in list">
            <div @click="details(item.id)" style="position: relative">
              <nav>
                <p v-html="item.seo_title"></p>
                <p v-html="item.content"></p>
              </nav>
              <van-image
                style="border-radius: 3%; overflow: hidden;"
                width="100%"
                height="100%"
                :src="item.img_url"
              />
            </div>
          </van-cell-group>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片列表数据
      list: [],
      // 控制加载状态
      loading: false,
      finished: false,
      // 激活当前的tab标签
      active: 0,
      // 图片分类数据
      photoList: []
    }
  },
  created() {
    // 获取当前的图片分类数据
    this.getPhotoList(),
      // 获取图片列表数据
      this.getList()
  },
  methods: {
    // 获取当前的图片分类数据
    async getPhotoList() {
      let { data: res } = await this.$http.get('/api/getimgcategory')
      // console.log(res)
      if (res.status !== 0) {
        return this.$Notify({
          type: 'warning',
          message: '获取图片分类数据失败'
        })
      }
      res.message.unshift({ title: '全部', id: 0 })
      // console.log(res.message)
      this.photoList = res.message
    },
    // 获取图片列表数据
    async getList() {
      let { data: res } = await this.$http.get('/api/getimages/' + this.active)
      // console.log(res)
      if (res.status !== 0) {
        return this.$Notify({
          type: 'warning',
          message: '获取图片分类数据失败'
        })
      }
      // console.log(res.message)
      this.list = res.message
    },
    details(id) {
      // console.log(id)
      this.$router.push('/photo/Info')
      window.localStorage.setItem('tabsId', id)
    }
  }
}
</script>

<style lang="less" scoped>

.van-nav-bar {
  z-index: 2 !important;
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__text,
.van-icon-arrow-left:before {
  color: #fff !important;
}
nav {
  overflow: hidden;
  width: 100%;
  position: absolute;
  bottom: 4px;
  height: 122px;
  color: #fff;
  font-size: 12px;
  z-index: 1;
  padding: 0 10px;
  border-radius: 0 0 10px 10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, .4);
}
.van-cell-group {
 padding: 0 10px; 
}
.van-nav-bar__text:active {
  background-color: #1989fa;
}
.van-button {
      line-height: 28px
}
</style>
