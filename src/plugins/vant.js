import Vue from 'vue'
import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Notify,
  NavBar,
  Tabbar,
  TabbarItem,
  Icon,
  Grid,
  GridItem,
  Image,
  List,
  Cell,
  PullRefresh,
  Card,
  Tag,
  Toast,
  Checkbox,
  Row,
  Col,
  ImagePreview,
  CellGroup,
  Tab,
  Tabs,
  SubmitBar,
  Search,
  Stepper,
  Divider,
  SwipeCell,
  Dialog,
  Field,
  AddressList,
  AddressEdit,
  CouponCell,
  CouponList,
  Popup,
  Sku,
  Collapse,
  CollapseItem,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon
} from 'vant'

Vue.use(ImagePreview)
  .use(CellGroup)
  .use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Notify)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(List)
  .use(Cell)
  .use(PullRefresh)
  .use(Card)
  .use(Tag)
  .use(Toast)
  .use(Checkbox)
  .use(NavBar)
  .use(Row)
  .use(Col)
  .use(SubmitBar)
  .use(Search)
  .use(Stepper)
  .use(Divider)
  .use(SwipeCell)
  .use(Dialog)
  .use(Field)
  .use(AddressList)
  .use(AddressEdit)
  .use(CouponCell)
  .use(CouponList)
  .use(Popup)
  .use(Sku)
  .use(Collapse)
  .use(CollapseItem)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
Vue.prototype.$notify = Notify