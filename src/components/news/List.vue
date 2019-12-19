<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-card
        v-for="item in list"
        :key="item.id"
        :thumb="item.img_url"
        @click="jumpClick(item.id)"
      >
        <!-- <div slot="thumb" class="font_img">{{item.img_url}}</div> -->
        <div slot="title" class="font_title">点击 : {{item.title}}</div>
        <div slot="num" class="new_click">点击 : {{item.click}}</div>
        <div slot="price" class="new_time">发表时间 : {{item.add_item | dataFormat}}</div>
      </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      isLoading: false
    }
  },
  created() {
    this.getNewList()
  },
  methods: {
    async getNewList() {
      const { data: res } = await this.$http.get('/api/getnewslist')
      console.log(res)

      if (res.status !== 0) return this.$toast('获取新闻资讯失败')
      this.list = res.message
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    async jumpClick(id) {
      // this.$store.commit("jump", id);
      this.$router.push('/news/newDetail')
      window.sessionStorage.setItem('id', id)
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.font_title {
  font-size: 14px;
  font-weight: 700;
  vertical-align: middle;
}
.new_click {
  color: #226aff;
  font-size: 12px;
  box-sizing: border-box;
}
.new_time {
  color: #226aff;
  font-size: 12px;
}

.van-nav-bar__title,
.van-icon-arrow-left:before,
.van-nav-bar__text {
  color: #fff;
}
.van-card__bottom {
  margin-top: 15px;
}
.van-card__thumb {
  width: 64px;
  height: 64px;
}
.van-card__header {
  height: 64px;
}
.van-image__img {
  background-size: cover;
}
</style>