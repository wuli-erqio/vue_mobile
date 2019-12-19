<template>
  <div>
    <div class="shopcard" v-for="(item) in shopCarList" :key="item.id">
      <van-card
        :num="item.cou"
        :price="item.sell_price"
        desc="描述信息"
        :title="item.title"
        :thumb="item.thumb_path"
      />
      <van-row>
        <van-col span="18"></van-col>
        <van-col span="6">
          <van-stepper v-model="item.cou" />
        </van-col>
      </van-row>
    </div>
    <div v-show="xianshi" >
       <van-submit-bar :price="getTotal" button-text="提交订单" @submit="onSubmit"/> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 购物车列表
      shopCarList: [],
      xianshi: false
    }
  },
  created () {
    this.getShopCarList()
    this.show()
  },
  methods: {
    // 获取购物车列表数据
    async getShopCarList () {
      const { data } = await this.$http.get('/api/goods/getshopcarlist/87,88,89')
      console.log(data)
      this.shopCarList = data.message
    },
    goBack () {
      this.$router.push('/index')
    },
    onSubmit () {
      this.$router.push('/submit')
    },
    show() {
      setTimeout(() => {
        this.xianshi = true
      }, 1100);
      console.log(this.xianshi);
      
    }
  },
  computed: {
    getTotal () {
      let total = 0
      let goods = 0
      this.shopCarList.forEach(item => {
        total += item.cou * item.sell_price * 100
        goods += item.cou
      })
      //   console.log(goods)
      window.sessionStorage.setItem('key', goods)

      return total
    }
  }
}
</script>

<style lang="less" scoped>
.shopcard {
  margin-top: 5px;
  background-color: #fafafa;
}
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
.van-submit-bar__bar {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
