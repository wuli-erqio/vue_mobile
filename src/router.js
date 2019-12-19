import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/index' }, 
    { path: '/index',
      component: Index,
      redirect: '/home',
      children: [
        { path: '/home', component: () => import(/* webpackChunkName: "home" */ './components/Home.vue') },
        { path: '/member', component: () => import(/* webpackChunkName: "member" */ './components/Member.vue') },
        { path: '/news/List', component: () => import(/* webpackChunkName: "list" */ './components/news/List.vue') },
        { path: '/news/newDetail', component: () => import(/* webpackChunkName: "newDetail" */ './components/news/newDetail') },
        { path: '/photo/list', component: () => import(/* webpackChunkName: "photo/list" */ './components/photo/List.vue') },
        { path: '/photo/Info', component: () => import(/* webpackChunkName: "photo/list" */ './components/photo/Info.vue') },
        { path: '/ShopCar', component: () => import(/* webpackChunkName: "ShopCar" */ './components/ShopCar.vue') },
        { path: '/Search', component: () => import(/* webpackChunkName: "Search" */ './components/Search.vue') },
        { path: '/addGoods', component: () => import(/* webpackChunkName: "addGoods" */ './components/addGoods.vue') },
        { path: '/Submit', component: () => import(/* webpackChunkName: "Submit" */ './components/Submit.vue') },
        { path: '/goods/List', component: () => import(/* webpackChunkName: "goods/List" */ './components/goods/List.vue') },
        { path: '/goods/Detail/:id', component: () => import(/* webpackChunkName: "goods/Detail" */ './components/goods/Detail.vue') },
        { path: '/goods/Desc/:id', component: () => import(/* webpackChunkName: "goods/Desc" */ './components/goods/Desc.vue') },
        { path: '/goods/Comments/:id', component: () => import(/* webpackChunkName: "goods/Comments" */ './components/goods/Comments.vue') },
        { path: '/goods/Purchase', component: () => import(/* webpackChunkName: "goods/Purchase" */ './components/goods/Purchase.vue') },
        { path: '/goods/purchase/site', component: () => import(/* webpackChunkName: "goods/purchase/site" */ './components/goods/Site.vue') }
      ]
    }]
})
