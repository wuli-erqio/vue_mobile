<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="淘乐购---越淘越快乐"
      :left-text="showGo ? '返回' : ''"
      :left-arrow="showGo"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :right-text="showSearch ? '添加' : ''"
    />

   <!-- 过渡 -->
    <transition name="slide-fade">
      <!-- 轮播图 and 九宫格 -->
      <router-view v-if="true"></router-view>
    </transition>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" style="height: 60px" v-if="navShow">
      <van-tabbar-item @click="junpRouter('/home')" name="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item @click="junpRouter('/member')" name="/member" icon="manager-o">会员</van-tabbar-item>
      <van-tabbar-item
        @click="junpRouter('/shopcar')"
        name="/ShopCar"
        icon="shopping-cart-o"
        :info="num"
      >购物车</van-tabbar-item>
      <van-tabbar-item @click="junpRouter('/Search')" name="/Search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '/home',
      show: false,
      showBack: '',
      num: 3
    }
  },
  methods: {
    // 跳转路由
    junpRouter(adress) {
      if (location.hash === '#' + adress) {
        return false
      }
      window.sessionStorage.setItem('sessionActive', adress)
      this.$router.push(adress)
    },
    // 返回上级路由
    onClickLeft() {
      if (this.showGo) {
        this.active = '/home'
      }
      this.num = window.sessionStorage.getItem('key')
      this.$router.go(-1)
    },

    // 跳转搜索路由
    onClickRight() {
      this.$router.push('/addGoods')
    }
  },
  computed: {
    showGo() {
      this.showBack = this.$route.path
      if (this.showBack !== '/home') {
        return true
      } else {
        return false
      }
    },
    // 导航栏搜索
    showSearch() {
      this.showBack = this.$route.path
      if (this.showBack !== '/Search') {
        return false
      } else {
        return true
      }
    },
    navShow() {
      this.showBack = this.$route.path
      if (this.showBack !== '/shopcar' && this.showBack !== '/goods/purchase') {
        return true
      } else {
        return false
      }
    },
    getNumber() {
      this.num = window.sessionStorage.getItem('key')
      return this.num
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  margin-top: 55px;
}
.van-nav-bar__text:active {
  background-color: #1989fa;
}
.van-nav-bar__title {
  background-color: #1989fa !important;
  max-width: 100%;
  font-size: 14px;
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__text,
.van-icon-arrow-left:before {
  color: #fff !important;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.01s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
