<template>
  <div>
    <!-- 图片信息区域 -->
    <div id="box" :key="item.id" v-for="item in imgList">
      <p class="title">{{item.title}}</p>
      <p>
        <span>发表时间: {{item.add_time | dataFormat}}</span>
        <span style="float: right">点击: {{item.click}}</span>
      </p>
      <!-- 缩略图区域 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item :key="index" v-for="(item, index) in thumbnail">
          <van-image @click="show = true" :src="item.src" />
        </van-grid-item>
      </van-grid>
      <p v-html="item.content"></p>
    </div>
    <!-- 评论区域 -->
    <div>
      <p style="font-weight: 700">发表评论</p>
      <hr />
      <footer>
        <textarea placeholder="请求留言内容" v-model="user.content"></textarea>
        <van-button type="info" style="width: 100%;padding: 10px;" @click="publish">发表评论</van-button>
        <div :key="index" v-for="(item, index) in comment">
          <p class="user">
            <span>第 {{index + 1}} 楼:</span>
            <span>用户: {{item.user_name}}</span>
            <span>发表时间: {{item.add_time | dataFormat}}</span>
          </p>
          <p style="padding-left: 20px">{{item.content}}</p>
        </div>
        <van-button plain type="danger" style="width: 100%;" @click="getMore" class="loadingBtn">加载更多</van-button>
      </footer>
    </div>
    <!-- 图片预览区域 -->
    <van-image-preview v-model="show" :images="images"></van-image-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片 id
      tabId: '',
      // 图片的详情
      imgList: [],
      // 图片的缩略图
      thumbnail: [],
      // 控图片的显示与隐藏
      show: false,
      // 图片路径
      images: [],
      // 评论内容
      comment: [],
      // 获取评论的页数
      pageindex: 1,
      // 用户评论
      user: {
        content: ''
      }
    }
  },
  created() {
    // 获取被点击的图文 id
    this.tabId = window.localStorage.getItem('tabsId')
    // console.log(this.tabId)
    // 获取图片信息
    this.getImg(),
      // 获取图片详情的缩略图
      this.getImgDetails(),
      // 获取评论
      this.getComment()
  },
  // 当点击返回的时候 触发
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取图片信息
    async getImg() {
      let { data: res } = await this.$http.get(
        '/api/getimageInfo/' + this.tabId
      )
      if (res.status !== 0) {
        return this.$Notify({
          type: 'warning',
          message: '获取图片分类数据失败'
        })
      }
      this.imgList = res.message
      // console.log(this.imgList)
    },
    // 获取图片详情的缩略图
    async getImgDetails() {
      let { data: res } = await this.$http.get(
        '/api/getthumimages/' + this.tabId
      )
      if (res.status !== 0) {
        return this.$Notify({
          type: 'warning',
          message: '获取图片分类数据失败'
        })
      }
      // console.log(res)
      this.thumbnail = res.message
      // console.log(this.thumbnail)
      this.thumbnail.forEach(item => {
        this.images.push(item.src)
      })
      // console.log(this.images)
    },
    // 获取评论
    async getComment() {
      let { data: res } = await this.$http.get(
        '/api/getcomments/' + this.tabId,
        { params: { pageindex: this.pageindex } }
      )
      // console.log(res);
      if (res.status !== 0) {
        return this.$Notify({
          type: 'warning',
          message: '获取评论失败'
        })
      }
      this.comment = res.message
      // console.log(this.comment)
    },
    // 点击加载更多
    async getMore() {
      this.pageindex++
      let { data: res } = await this.$http.get(
        '/api/getcomments/' + this.tabId,
        { params: { pageindex: this.pageindex } }
      )
      // console.log(res)
      // console.log(res);
      if (res.status !== 0) {
        return this.$Notify({
          type: 'warning',
          message: '获取评论失败'
        })
      }
      res.message.forEach(item => {
        this.comment.push(item)
      })
    },
    // 点击添加评论
    async publish() {
      // console.log(this.user.userComment)
      if (this.user.content.trim().length === 0) {
        return this.$Notify({
          type: 'warning',
          message: '请输入内容'
        })
      }
      this.user.content = this.user.content.replace(/激情/g, '**')
      let { data: res } = await this.$http.post(
        '/api/postcomment/' + this.tabId,
        this.user
      )
      // console.log(res)
      this.user = ''
      this.getComment()
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  z-index: 2 !important;
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__text,
.van-icon-arrow-left:before {
  color: #fff !important;
}
#box {
  padding: 10px;
}
.title {
  color: #26a2ff;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}
#box span {
  color: #8f8f94;
  font-size: 13px;
}
.van-grid {
  border-top: 1px solid #000;
}
.van-image {
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.4);
}
textarea {
  width: 100%;
  height: 90px;
  padding: 10px;
  box-sizing: border-box;
}
footer {
  margin: 10px;
}
.user {
  font-size: 14px;
  background-color: #cccccc;
  height: 30px;
  line-height: 30px;
}
.user span {
  margin-right: 10px;
}
.van-nav-bar__text:active {
  background-color: #1989fa;
}
.loadingBtn {
  margin-bottom: 80px;
}
.van-button {
  line-height: 0;
}
</style>
