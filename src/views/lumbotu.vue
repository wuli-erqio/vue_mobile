<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="image in title" :key="image.id">
        <img v-lazy="image.img" style="width: 100%; height: 180px" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['title']
}
</script>

<style lang="less" scoped>
</style>
