<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 商品列表 -->
      <van-list id="list">
        <van-cell
          class="goodsList"
          v-for="(item,index) in storeList"
          :key="index"
         @click="getDescribe(item.id,item.img_url,item.sell_price,item.title)"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template>
            <div>
              <van-image width="100%" fit="cover" :src="item.img_url"  style="margin:5px"/>
              <div class="title">{{item.title}}</div>
            </div>

            <div class="bottonBox">
              <strong class="Num1">{{'￥'+item.sell_price}}</strong>
              <del class="Num2">{{'￥'+item.market_price}}</del>
              <div>
                <span>热卖中</span>
                <span class="one">剩余{{item.stock_quantity}}件</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-list>
      <!-- 底部标签栏 -->
      <van-tabbar>
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="contact">会员</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="search">搜索</van-tabbar-item>
      </van-tabbar>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 所有商品数据
      storeList: [],
      currentPage: 1,
      // 下拉刷新
      isLoading: false
    }
  },
  created () {
    this.getStoreList()
  },
  methods: {
    // 获取全部数据
    async getStoreList () {
      const { data: res } = await this.$http.get(`/api/getgoods`, {
        params: {
          pageindex: 1
        }
      })
      console.log(res)
      this.storeList = res.message
      console.log(this.storeList)
    },
    // 点击导航栏左侧按钮跳转
    onClickLeft () {
      this.$router.go(-1)
    },
    // 点击商品列表跳转页面
    getDescribe (id,img,sell,title) {
      window.localStorage.setItem('shopId', id)
      window.localStorage.setItem('shopImg', img)
      window.localStorage.setItem('shopSell', sell)
      window.localStorage.setItem('shopTit', title)
      // 直接调用$router.push 实现携带参数的跳转
      this.$router.push('/goods/detail/' + id)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .goodsList {
  height: 320px;
}
// /deep/ .van-cell__value--alone {
//   background-color: #EEE;
// }
#list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 80px;
  padding: 5px;
}
/deep/ .van-cell {
  width: 48% !important;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 0;
}
.bottonBox {
  position: absolute;
  background-color: #EEE;
  width: 100%;
  bottom: 0;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow:hidden;
  -webkit-box-orient: vertical;
  margin: 20px 5px;
}
.Num1 {
  color: red;
  font-size: 16px;
  margin-left: 5px;
}
.Num2 {
  margin-left: 10px;
}
.bottonBox span {
  margin-left: 5px;
  margin-right: 5px;
}
.one {
  float: right;
}
</style>
