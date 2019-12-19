<template>
  <div>
    <div class="body_box">
      <template v-if="isComplate">
        <div class="title">{{detailList[0].title}}</div>
        <div class="info">
          <span>发表时间 : {{detailList[0].add_time | dataFormat}}</span>
          <span span="6">点击次数 : {{detailList[0].click}}</span>
        </div>
        <div class="content" v-html="detailList[0].content"></div>
      </template>
      <div class="comment">发表评论</div>
      <van-row type="flex">
        <van-col span="24">
          <textarea class="textarea" placeholder="请输入留言" rows="5" v-model="message"></textarea>
        </van-col>
      </van-row>
      <van-button type="info" class="btn" @click="sub_commont">提交</van-button>
      <div v-for="(item, index) in commentList" :key="item.id">
        <div class="comment_nav">
          <span>第{{index + 1}}楼</span>
          <span>用户: {{item.user_name}}</span>
          <span>发表时间 : {{item.add_time | dataFormat}}</span>
        </div>
        <div class="comment_wz">{{item.content}}</div>
      </div>
      <van-button plain type="danger" class="loadingBtn" @click="redBtn">加载更多</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      detailList: [],
      commentList: [],
      isComplate: false,
      count: 0,
      message: ''
    }
  },
  created() {
    this.getDatial()
    this.getCommentLis()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async getDatial() {
      // const id = this.$store.state.jumpId;
      const id = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.get('/api/getnew/' + id)
      if (res.status !== 0) return
      this.isComplate = !this.isComplate
      this.detailList = res.message
      // console.log(this.detailList);
    },
    // 获取评论列表
    async getCommentLis() {
      const id = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.get(
        `/api/getcomments/${id}?pageindex=${this.pageindex}`
      )
      console.log(res)
      if (res.status !== 0) return
      this.commentList = res.message

      console.log(this.commentList)
    },
    // 获取评论内容
    async sub_commont() {
      const id = window.sessionStorage.getItem('id')
      this.message = this.message.replace(/激情/g, '**')
      const { data: res } = await this.$http.post(`/api/postcomment/${id}`, {
        content: this.message
      })
      console.log(res)
      if (res.status !== 0) return
      this.getCommentLis()
      this.message = ''
    },
    // 点击加载更多页
    async redBtn() {
      this.pageindex++
      const id = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.get(
        `/api/getcomments/${id}?pageindex=${this.pageindex}`
      )
      console.log(res)
      if (res.status !== 0) return
      console.log(res.message);
      res.message.forEach((item) => {
        this.commentList.push(item)
      })    
      // this.getCommentLis()
      // console.log();
      
    }
  }
}
</script>
<style lang="less" scoped>
.body_box {
  margin: 0 20px;
}
.title {
  color: #1989fa;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  margin: 10px 0;
}
.info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #1989fa;
  border-bottom: 1px solid #ccc;
  padding: 7px 0;
}
.van-nav-bar {
  background-color: #1989fa;
}
.van-nav-bar__title,
.van-icon-arrow-left:before,
.van-nav-bar__text {
  color: #fff;
}
.van-row--justify-space-between {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.comment {
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
}
.textarea {
  width: 98%;
  font-size: 14px;
}
.btn,
.loadingBtn {
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
}
.loadingBtn {
  margin-bottom: 80px;
}
.comment_nav {
  height: 30px;
  background-color: #ccc;
  font-size: 12px;
  line-height: 30px;
}
.comment_nav span {
  margin-right: 6px;
}
.comment_wz {
  height: 35px;
  font-size: 12px;
  line-height: 35px;
}
</style>