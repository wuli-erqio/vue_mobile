<template>
  <div>
    <!-- 搜索区域 -->
    <van-row>
      <van-col span="24">
        <van-search
          v-model="inputVal"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
          clearable
        />
        <!-- 滑动单元格 -->
        <van-swipe-cell v-for="(item) in serachList" :key="item.id">
          <van-cell :border="false" :title="item.name" value="商品上架时间：2019-9-11" />
          <template slot="right">
            <van-button square type="danger" text="删除" @click="remove(item.id)" />
          </template>
        </van-swipe-cell>
      </van-col>
    </van-row>
    <div :class="inputVal.length >= 1 ? 'inputdis' : '' ">
      <van-row>
        <van-col span="22">搜索历史</van-col>
        <van-col span="2">
          <van-icon name="delete" @click="deleteHistory"/>
        </van-col>
      </van-row>
      <van-divider :class="this.history.length >= 1 ? 'inputdis' : '' ">暂无搜索历史</van-divider>
      <van-tag v-for="item in history" :key="item.id">{{item}}</van-tag>
    </div>
    <!-- 确认删除弹窗 -->
    <van-dialog v-model="show" title="标题" show-cancel-button>
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputVal: '',
      active: 0,
      // 搜索列表
      serachList: [],
      show: false,
      // 历史记录
      history: []
    }
  },
  created() {
    let data = window.localStorage.getItem('arr')
    this.history = JSON.parse(data)
    console.log(this.history);
    
  },
  methods: {
    // 搜索事件
    onSearch () {
    //   console.log(this.inputVal)
      this.getSearchList()

      this.history.push(this.inputVal)

      console.log(this.history)

      window.localStorage.setItem('arr', JSON.stringify(this.history))
      
      
    },
    // 获取历史搜索记录
    async getSearchList () {
      const { data: res } = await this.$http.get('/api/getprodlist')
      //   console.log(res)
      this.serachList = res.message
      // console.log(this.serachList)
    },
    // 取消搜索
    onCancel () {
      if (this.inputVal.length <= 0) {
        this.serachList = []
      }
    },
    // 删除搜索记录
    remove (id) {
      // 确认弹窗
      this.$dialog.confirm({
        message: '确定要删除吗？'
      }).then(async () => {
        // on confirm
        const { data: res } = await this.$http.get('/api/delproduct/' + id)
        console.log(res)
        this.getSearchList()
      }).catch(() => {
        // on cancel
      })
    },
    // 删除历史记录
    deleteHistory () {
      this.history = []
      window.localStorage.setItem('historys', [])
    },
    // 添加商品
    addText () {
    //   console.log(111)
      this.$router.push('/addGoods')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
    height: 40px;
}
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
.van-row {
  margin: 15px;
}
.inputdis {
  display: none;
}
.van-tag {
    margin-left: 15px;
    margin-bottom: 15px;
}
</style>
