<template>
  <div>
    <!-- 轮播图 -->
    <swipe :title="swipeList"></swipe>
    <!-- 九宫格 -->
    <van-grid :gutter="10" style="margin-top: 30px" :column-num="3">
      <van-grid-item to="/news/List">
        <div class="iconText">
          <img src="../assets/img/menu1.png" style="width: 50%" />
          <p style="margin-bottom: 0">新闻资讯</p>
        </div>
      </van-grid-item>
      <van-grid-item to="/photo/List">
        <div class="iconText">
          <img src="../assets/img/menu2.png" style="width: 50%" />
          <p style="margin-bottom: 0">图片分享</p>
        </div>
      </van-grid-item>
      <van-grid-item to="/goods/list">
        <div class="iconText">
          <img src="../assets/img/menu3.png" style="width: 50%" />
          <p style="margin-bottom: 0">商品购买</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="iconText">
          <img src="../assets/img/menu4.png" style="width: 50%" />
          <p style="margin-bottom: 0">留言反馈</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="iconText">
          <img src="../assets/img/menu5.png" style="width: 50%" />
          <p style="margin-bottom: 0">视频专区</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="iconText">
          <img src="../assets/img/menu6.png" style="width: 50%" />
          <p style="margin-bottom: 0">联系我们</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 导入
import swipe from '../views/lumbotu.vue'
export default {
  data() {
    return {
      swipeList: []
    }
  },
  created() {
    this.getSwipe()
  },
  methods: {
    async getSwipe() {
      let { data: res } = await this.$http.get('api/getlunbo')
      if (res.status !== 0) {
        return this.$notify({ type: 'danger', message: '轮播图加载失败' })
      }
      this.swipeList = res.message
    }
  },
  components: {
    // 注册引入轮播图组件
    swipe
  }
}
</script>

<style lang="less" scoped>
.iconText {
  text-align: center;
  margin: 0;
}
/deep/.van-grid-item__content--surround::after {
  border-width: 0;
}
</style>
