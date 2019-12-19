<template>
  <div>
    <div class="setting">
      <van-icon name="setting" class="member" />
      <p>pin命k发中...</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.setting {
  color: pink;
  letter-spacing: 4px;
  margin-top: 30px;
  height: 100px;
  width: 100%;
  text-align: center;
  animation: size 2s linear infinite;
}
.member {
  width: 30px;
  transition: all 0.3s;
  font-size: 30px;
  animation: rotate 2s linear infinite;
}
.van-nav-bar__title {
  background-color: #1989fa !important;
  max-width: 100%;
  font-size: 14px;
  color: #fff;
}
@keyframes rotate {
  0% {
    color: pink;
    transform: rotate(0deg);
  }
  25% {
    color: hotpink;
    transform: rotate(90deg);
  }
  50% {
    color: deeppink;
    transform: rotate(180deg);
  }
  75% {
    color: lightpink;
    transform: rotate(270deg);
  }
  100% {
    color: pink;
    transform: rotate(360deg);
  }
}
@keyframes size {
  0% {
    color: pink;
  }
  25% {
    color: hotpink;
  }
  50% {
    color: deeppink;
  }
  75% {
    color: lightpink;
  }
  100% {
    color: pink;
  }
}
</style>
