<template>
  <div>
    <div class="box">
      <p>
        <strong>发表评论</strong>
      </p>
      <van-divider :style="{ borderColor: '#000'}" />
      <van-cell-group>
        <van-field v-model="message.content" type="textarea" placeholder="请输入留言" rows="1" autosize />
      </van-cell-group>
      <van-button type="info" size="large" @click="addComments">发表评论</van-button>

      <van-list v-for="(item,index) in commentsList" :key="index">
        <van-cell class="databox" style="background-color: skyblue">
          <template>
            <div>
              <span>第{{index+1}}楼</span>
              <span>用户:{{item.user_name}}</span>
              <span>发表时间:{{item.add_time | dataFormat}}</span>
            </div>
          </template>
        </van-cell>
        <span class="dataitem">{{item.content}}</span>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 传递的id
      shopid: 0,
      // 留言框输入的值
      message: {
        content: ''
      },
      // 当前页码
      pageindex: 1,
      // 存储的评论数据
      commentsList: [],
      // 存储评论
      List: {
        add_time: '2019-09-11T03:08:11.000Z',
        content: '',
        user_name: '匿名用户'
      }
    }
  },
  created () {
    this.shopid = window.localStorage.getItem('shopId')
    this.getCommentsList()
  },
  methods: {
    // 点击返回
    onCommentsLeft () {
      this.$router.go(-1)
    },
    // 请求评论
    async getCommentsList () {
      const { data: res } = await this.$http.get(
        `api/getcomments/${this.shopid}?pageindex=${this.pageindex}`
      )
      console.log(res)
      this.commentsList = res.message
    },
    // 点击发表评论
    async addComments () {
      this.message.content = this.message.content.replace(/激情/g, '**')
      if (this.message.content.trim().length === 0) {
        return console.log('请重新输入')
      }
      await this.$http.post(
        `/api/postcomment/${this.shopid}`,
        this.message
      )
      this.message.content = ''
      this.getCommentsList()
    }
  }
}
</script>
<style lang="less" scoped>
.van-field {
  height: 100px;
  border-color: #ddd;
  margin: 5px 0;
}
.box {
  padding: 0 5px;
}
.databox {
  font-size: 12px;
  height: 30px;
  padding: 0 !important;
  border: 0;
}
.van-cell {
  margin: 0 !important;
}
.van-list {
  padding: 0 !important;
}
.van-button {
  margin-bottom: 5px !important ;
}
.dataitem {
  display: block;
  font-size: 12px;
  padding-left: 20px;
  height: 30px;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-cell-group {
  margin-bottom: 5px;
}
.databox span {
  margin-right: 5px;
}
[class*=van-hairline]::after {
  border: 1px solid #000;
}
</style>
