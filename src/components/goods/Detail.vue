<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="黑马程序员.vant" left-text="返回" left-arrow @click-left="onDetailLeft" />
    <!-- 商品列表 -->
    <van-list class="listH">
      <!-- 轮播图 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template>
          <!-- 轮播图 -->
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in swipeImg" :key="index">
              <van-image width="200" height="200" :src="item.src" />
            </van-swipe-item>
          </van-swipe>
        </template>
      </van-cell>
      <!-- 商品参数 Top -->
      <van-cell v-for="(item,index) in detailList" :key="index">
        <!-- 使用 title 插槽来自定义标题 -->
        <template>
          <div class="infotitle">{{item.title}}</div>
          <p style="color: #8F8F94">
            <span>
              市场价：
              <del>￥{{item.market_price}}</del>
            </span>
            <span>
              销售价：
              <strong class="redsize">￥{{item.sell_price}}</strong>
            </span>
          </p>
          <!-- 添加数量 -->
          <div style="height: 40px">
            <span style="float: left" class="purchase">购买数量：</span>
            <van-stepper v-model="value" style="float: left;" />
          </div>
          <!-- 按钮 -->
          <div>
            <van-button type="info" size="small" @click="purchase(item.sell_price)">立即购买</van-button>
            <van-button type="danger" size="small" @click="addShopCar">加入购物车</van-button>
          </div>
        </template>
      </van-cell>
      <!-- 商品参数 foot -->
      <van-cell v-for="(item,index) in detailList" :key="index">
        <template>
          <span style="font-size: 16px">商品参数</span>
          <div class="itemBox">
            <p>商品货号:{{item.goods_no}}</p>
            <p>库存情况:{{item.stock_quantity}}件</p>
            <p>上架时间:{{item.add_time}}</p>
          </div>
          <van-button
            class="btn"
            plain
            hairline
            type="info"
            size="large"
            @click="introduce(item.id)"
          >图文介绍</van-button>
          <van-button
            class="btn"
            plain
            hairline
            type="danger"
            size="large"
            @click="evaluate(item.id)"
          >商品评论</van-button>
        </template>
      </van-cell>
    </van-list>

    <van-sku
      v-model="show"
      stepper-title="我要买"
      :sku="sku"
      :goods-id="this.shopid"
      :hide-stock="sku.hide_stock"
      show-add-cart-btn
      reset-stepper-on-hide
      :initial-sku="initialSku"
      :hide-quota-text="true"
      :quota="2"
      @stepper-change="goodsCountChange"
    >
      <!-- <template slot="sku-stepper">
        你好
      </template>-->
      <!-- 自定义 sku-header-price -->
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol">￥</span>
          <span class="van-sku__price-num">{{ props.price }}</span>
        </div>
      </template>

      <!-- 自定义 sku actions -->
      <template slot="sku-actions">
        <div class="van-sku-actions">
          <van-button square size="large" type="warning">积分兑换</van-button>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button square size="large" type="danger" @click="addCar">买买买</van-button>
        </div>
      </template>
    </van-sku>

    <!-- 底部标签栏 -->
    <van-tabbar>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="contact">会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :info="this.sum">购物车</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 存储商品参数区的数据
      detailList: [],
      //   存储轮播图的地址
      swipeImg: [],
      // 步进器里的值
      value: 1,
      // 购物车的值
      sum: 0,
      //   传递的id
      shopid: 0,
      // 弹窗
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl:
                  'http://demo.dtcms.net/upload/201504/20/thumb_201504200046589514.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl:
                  'http://demo.dtcms.net/upload/201504/20/thumb_201504200046589514.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 1156000, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '1', // 是否必填 '1' 表示必填
            placeholder: '' // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s2: '1193',
        s1: '30349',
        // 初始选中数量
        selectedNum: 2
      },
      customStepperConfig: {
        // 自定义限购文案
        quotaText: '每次限购xxx件',
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(111)
        },
        // 库存
        stockNum: 1999,
        // 格式化库存
        stockFormatter: stockNum => {}
      },
      skuData: {
        // 商品 id
        goodsId: '946755',
        // 留言信息
        messages: {
          message_0: '12',
          message_1: ''
        },
        // 另一种格式的留言，key 不同
        cartMessages: {
          留言1: 'xxxx'
        },
        // 选择的商品数量
        selectedNum: 1,
        // 选择的 sku 组合
        selectedSkuComb: {
          id: 2257,
          price: 100,
          s1: '30349',
          s2: '1193',
          s3: '0',
          stock_num: 111
        }
      },
      // 传递的数据
      shopimg: null,
      shopsell: 0
    }
  },
  created() {
    this.shopid = window.localStorage.getItem('shopId')
    this.shopimg = window.localStorage.getItem('shopImg')
    this.shopsell = Number(window.localStorage.getItem('shopSell'))
    this.getDetailList()
    // console.log(this.shopsell)
  },
  methods: {
    //   获取商品参数
    async getDetailList() {
      // console.log(this.shopid)
      const { data: res } = await this.$http.get(
        '/api/goods/getinfo/' + this.shopid
      )
      this.detailList = res.message
      // console.log(this.detailList)
      const { data: red } = await this.$http.get(
        '/api/getthumimages/' + this.shopid
      )
      this.swipeImg = red.message
      // console.log(this.swipeImg)
    },
    // 点击返回
    onDetailLeft() {
      this.$router.go(-1)
    },
    // 点击图文介绍
    introduce(id) {
      this.$router.push('/goods/desc/' + id)
    },
    // 点击加入购物车按钮
    addShopCar() {
      this.sum += this.value
    },
    // 点击商品评论
    evaluate(id) {
      this.$router.push('/goods/comments/' + id)
    },
    // 点击立即购买
    purchase(sell) {
      this.sku.price = sell
      this.sku.list.price = this.shopsell
      this.show = true
      console.log(this.sku)
      this.sku.tree.forEach(item => {
        item.v.forEach(item1 => {
          item1.imgUrl = this.shopimg
        })
      })    
    },
    addCar() {
      this.show = false
      this.$router.push('/goods/purchase')
    },
    goodsCountChange(num) {
       this.sku.list.forEach(item => {
        item.price = this.shopsell + '00'
        item.price = Number(item.price) * num
        console.log(item.price)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.van-cell {
  border: 1px solid #eee;
  margin: 10px 0;
}
.van-list {
  padding: 0 10px;
}
.infotitle {
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.redsize {
  font-size: 16px;
  color: red;
}
.purchase {
  color: #8f8f94;
  margin-right: 5px;
}
.van-button--small {
  margin: 0 5px !important;
  font-size: 14px !important;
}
.itemBox {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  color: #8f8f94;
  padding: 10px;
  margin: 10px;
}
.btn {
  margin-top: 5px;
  height: 40px;
  line-height: 38px;
}
.listH {
  margin-bottom: 80px;
}
.van-image__img {
  display: block;
  margin: auto;
}
.van-swipe-item {
  text-align: center;
}
.van-button--large {
  width: 98%;
}
</style>
