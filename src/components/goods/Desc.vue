<template>
  <div>
    <!-- 导航栏 -->
      <h4>{{descList.title}}</h4>
      <van-divider :style="{ borderColor: '#000'}" />
      <div v-html="this.descList.content" class="div">{{descList.content}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 所有数据
      descList: {},
      // 传递的ID
      shopid: 0
    }
  },
  created () {
    this.shopid = window.localStorage.getItem('shopId')
    this.getDescList()
  },
  methods: {
    //   获取数据
    async getDescList () {
      const { data: res } = await this.$http.get(
        '/api/goods/getdesc/' + this.shopid
      )
      this.descList = res.message[0]
      console.log(this.descList)
      console.log(this.descList.title)
    },
    // 点击返回按钮
    onDescLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
h4 {
  text-align: center;
  color: #226AFF;
}
.div {
    padding: 0 5px;
    margin-bottom: 70px;
}
/deep/.gomeImgLoad {
  width: 100%;
  height: 100%;
}
</style>
