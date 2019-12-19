<template>
  <div>
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入商品名称" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="addSure">添加商品</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('/Search')
    },
    async addSure () {
      if (this.value.trim().length <= 0) {
        this.$notify({ type: 'warning', message: '请输入商品名称' })
      } else {
        const { data: res } = await this.$http.post('/api/addproduct', { name: this.value })
        console.log(res)
        this.value = ''
        this.$notify({ type: 'success', message: '添加成功' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
  color: #ccc;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
}
.van-button {
    background-color: #1989fa;
    margin-top: 25px;
}
</style>
