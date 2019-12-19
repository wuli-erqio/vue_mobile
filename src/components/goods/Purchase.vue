<template>
  <div>
    <!-- 地址 -->
    <van-list>
      <van-cell @click="editAddress">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <!-- 地址 -->
          <van-address-list v-model="chosenAddressId" :list="list" />
        </template>
      </van-cell>
    </van-list>
    <van-icon name="shop-collect" class="icon" />
    <span class="store">黑马什么都买专卖店</span>
    <!-- 商品列表 -->
    <van-card
      num="2"
      :price="this.shopsell<0? 0:this.shopsell"
      desc="颜色分类：白色；尺码：xl；【收藏加购物车付款优先发货】"
      :title="this.shoptit"
      :thumb="this.shopimg"
    />
    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <!-- 订单备注 -->
    <van-cell-group>
      <van-field label="我太难了" placeholder="剩下的没想好 此处省略一万个功能" />
    </van-cell-group>

   <div v-show="xianshi">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="message"/>
        <van-goods-action-icon icon="shop-o" text="店铺" @click="message"/>
        <van-goods-action-button type="warning" text="还没想好" @click="message"/>
        <van-goods-action-button type="danger" text="立即购买" @click="message"/>
      </van-goods-action>
   </div>
  </div>
</template>
<script>
const coupon = {
  available: 1,
  condition: '无使用门槛\n优惠无上限',
  reason: '',
  value: 999900,
  name: '传说中的神券',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '9999',
  unitDesc: '元'
}
export default {
  data () {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        }
      ],
      xianshi: false,
      // 优惠券
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      // 传递的数据
      shopimg:'',
      shoptit:'',
      shopsell:0
    }
  },
  created(){
    this.shopimg = window.localStorage.getItem('shopImg')
    this.shoptit = window.localStorage.getItem('shopTit')
    this.shopsell = Number(window.localStorage.getItem('shopSell'))*2
    this.show()
  },
  methods: {
    //   点击返回
    onPurchaseLeft () {
      this.$router.go(-1)
    },
    // clickPosition 表示关闭时点击的位置
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
          })
          break
      }
    },
    show() {
      setTimeout(() => {
        this.xianshi = true
      }, 1100);
      console.log(this.xianshi);
      
    },
    // 点击地址栏
    editAddress () {
      this.$router.push('/goods/purchase/site')
    },
    // 优惠券
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
      this.shopsell = this.shopsell- Number(coupon.valueDesc)
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    message() {
      this.$toast('程序猿正在骑马来的路上....')
    }
  }
}
</script>
<style lang="less" scoped>
.van-address-list__add {
  display: none !important;
}
.van-address-list {
  padding-bottom: 0 !important;
}
.cell {
  border-bottom: 0;
}
.van-card {
  border-top: 0;
}
.store {
  font-size: 14px;
  margin-left: 5px;
}
.icon {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
