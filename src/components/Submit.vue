<template>
    <div>
        <van-nav-bar title="黑马程序员.vant" left-text="返回" left-arrow/>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$dialog.alert({ message: '已成功提交订单' }).then(() => {
      this.$router.push('/index')
    })
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar {
  background-color: #1989fa;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
}
</style>
