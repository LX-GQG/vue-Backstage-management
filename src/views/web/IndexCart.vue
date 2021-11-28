<template>
  <div class="shop_car_box">
    <div class="nav">
      <div class="nav-information">
        <ul>
          <li>
          </li>
          <li>
            <router-link to="" class="one">我的订单</router-link>
          </li>
          <li>
            <i
              class="el-icon-shopping-cart-2"
            ></i>
            <router-link to="/indexCart" class="cartweizhi">购物车</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu">
      <div class="menu-place">
        <div class="menu-logo">
          <img src="../../assets/img/logofont.png" />
        </div>
        <div class="menu-nav">
          <ul>
            <li>
              <router-link to="/indexMain" class="jianbian">首页</router-link>
            </li>
            <li>
              <router-link to="/indexme" class="jianbian">关于我们</router-link>
            </li>
          </ul>
        </div>
        <div class="menu-search">
          <!--搜索区域-->
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="w">
      <div class="title">
        <span class="line"></span>
        我的购物车
      </div>
      <div class="cart-warp">
        <!-- 头部全选模块 -->
        <div class="cart-thead">
          <div class="t-checkbox">
            <input
              type="checkbox"
              style="margin-right: 5px"
              name=""
              id=""
              class="checkall"
            />
            全选
          </div>
          <div class="t-goods">商品信息</div>
          <div class="t-price">单价</div>
          <div class="t-num">数量</div>
          <div class="t-sum">金额</div>
          <div class="t-action">操作</div>
        </div>
        <!-- 商品详细模块 -->
        <div class="cart-item-list" :data="cartList" v-for="(item,index) in cartList" :key="index">
            <p hidden="hidden" >{{ item.commid }}</p>
          <div class="shop">
            <div class="cart-item">
              <div class="p-checkbox" style="width: 95px !important">
                <input type="checkbox" name="" id="" class="j-checkbox" />
              </div>
              <div class="p-goods">
                <div class="p-img">
                  <img :src="'/static'+item.picture" />
                </div>
                <div class="p-msg">
                  <div class="descript">
                    {{ item.commname }}
                  </div>
                  <div class="p-type">
                    <span>数量：{{ item.cartnumber }}</span>
                  </div>
                </div>
              </div>
              <div class="p-price">￥{{ item.commoney }}</div>
              <div class="p-num">
                <div class="quantity-form">
                  <a href="javascript:;" class="decrement">-</a>
                  <input type="text" class="itxt" value="1" />
                  <a href="javascript:;" class="increment">+</a>
                </div>
              </div>
              <div class="p-sum">￥12.60</div>
              <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
          </div>
        </div>
        <!-- 结算模块 -->
        <div class="cart-floatbar">
          <div class="select-all">
            <input type="checkbox" name="" id="" class="checkall" />全选
          </div>
          <div class="operation">
            <a href="javascript:;" class="remove-batch"> 删除选中的商品</a>
            <a href="javascript:;" class="clear-all">清理购物车</a>
          </div>
          <div class="toolbar-right">
            <div class="amount-sum">已经选<em>1</em>件商品</div>
            <div class="price-sum">合计（不含运费）： <em>￥12.60</em></div>
            <div class="btn-area">去结算</div>
          </div>
        </div>
        <!-- cart-floatbar end -->
      </div>
    </div>
    <indexfooter></indexfooter>
    <v-goTop></v-goTop>
  </div>
</template>

<script>
import { getcartList } from '@/api/cart.js'
import { BynameGood } from '@/api/goods.js'

import indexfooter from '@/views/web/IndexFooter'
import ScrollTop from '@/views/web/AppTop'

export default {
  data () {
    return {
        cartList: [],
        commid: '',
        goodList: [],
    }
  },
  created () {
    this.getCartList()
  },
  methods: {
      getCartList () {
          var sionlist = JSON.parse(sessionStorage.getItem('cust'))
          getcartList (sionlist.custid)
            .then((res) => {
            if (res.data.code === 200) {
              this.cartList = res.data.data
            } else {
                this.$message.error(res.data.message)
            }
            })
            .catch((err) => {
                console.log(err)
            })
      }
  },
  
  components: {
    indexfooter,
    'v-goTop': ScrollTop
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul li{
  list-style: none;
}
a{
  text-decoration: none;
  color: white;
}
#web_header{
  width: 100%;
  height: 90px;
  position: relative;
}

.nav{
  width: 100%;
  height: 40px;
  background-image: linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%);
}
.nav-information{
  width: 1200px;
  height: 40px;
  margin: 0 auto;
}
.nav .nav-information ul {
  float: right;
}
.nav .nav-information ul li{
  float: left;
}
.nav .nav-information ul li .bluebg{
  color: #858585;
}
.nav .nav-information ul li .one{
  line-height: 40px;
  margin-left: 18px;
  font-size: 13px;
  color: #858585;
}
.nav .nav-information ul li .el-icon-shopping-cart-2{
  margin-left: 15px;
}
.nav .nav-information ul li .cartweizhi{
  line-height: 40px;
  font-size: 13px;
  color: #858585;
}

.menu{
  width: 100%;
  height: 100px;
  position: relative;
}
.menu .menu-place{
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.menu .menu-place .menu-logo {
  position: absolute;
}
.menu .menu-place .menu-logo img{
  width: 120px;
  height: 50px;
  margin-top: 20px;
  margin-left: 5px;
}
.menu .menu-place .menu-nav{
  position: absolute;
  left: 300px;
  top: 45px;
}
.menu .menu-place .menu-nav ul li .jianbian{
  background: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.menu .menu-place .menu-nav ul li{
  float: left;
  margin-left: 35px;
}
.menu .menu-place .menu-search{
  position: absolute;
  right: 0;
  top: 35px;
}
em,
i {
  font-style: normal;
}
li {
  list-style: none;
}
a {
  color: #666;
  text-decoration: none;
}
a:hover {
  color: #e33333;
}
body {
  font: 12px/1.5 "Microsoft YaHei", "Heiti SC", tahoma, arial,
    "Hiragino Sans GB", \\5b8b\4f53, sans-serif;
  color: #666;
}

.J_ItemHead {
  height: 32px;
  line-height: 32px;
  text-indent: 46px;
  color: #555555;
  font-size: 14px;
  margin-top: 10px;
}
.shop_car_box {
  padding-bottom: 20px;
}

.shop {
  transition: 0.3s;
}
.w {
  width: 1192px;
  margin: 0 auto;
  padding: 32px 35px;
  background: #fff;
}

.w .title {
  font-size: 18px;
  color: #1e1e1e;
  margin-bottom: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.hotSale .tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
}

.pro_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.pro_list .pro_list_item {
  width: 22%;
  padding: 37px 26px 20px;
  font-size: 14px;
  color: #666666;
  border: 1px solid rgba(231, 231, 231, 1);
}

.pro_list .pro_list_item div:nth-child(2) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pro_list_item .img {
  width: 100%;
  /* height: 140px; */
  margin-bottom: 19px;
}

.pro_list_item .img img {
  width: 100%;
  height: 169px;
}

.w .title .line {
  width: 4px;
  height: 20px;
  background: #cca156;
  display: inline-block;
  margin-right: 8px;
  margin-top: -1px;
}
.cart-thead {
  height: 40px;
  line-height: 40px;
  /* margin: 5px 0 10px; */
  /* padding: 5px 0; */
  background: #f3f3f3;
  border: 1px solid #f7f8fa;
  border-top: 0;
  position: relative;
  text-align: center;
}
.cart-thead > div,
.cart-item > div {
  float: left;
}
.t-checkbox,
.p-checkbox {
  height: 32px;
  line-height: 32px;
  padding-top: 7px;
  width: 122px !important;
  padding-left: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.t-goods {
  width: 400px;
  text-align: left;
}
.t-price {
  width: 126px;
  padding-right: 40px;
  text-align: center;
}
.t-num {
  width: 156px;
  text-align: center;
}
.t-sum {
  width: 100px;
  text-align: center;
}
.t-action {
  width: 130px;
  text-align: center;
}

.cart-warp {
  background: #fff;
}
.cart-item {
  height: 160px;
  /* border-style: solid;
        border-width: 2px 1px 1px;
        border-color: #aaa #f1f1f1 #f1f1f1; */
  background: #fff;
  padding-top: 14px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  background: #f7f8fa;
  margin-top: 0;
  padding-top: 0;
  transition: 0.3s;
}

/* 选中的商品的背景色 */
.check-cart-item {
  /* background: #F7F8FA; */
  background: #fff7e8;
}
.p-checkbox {
  width: 50px;
}
.p-goods {
  margin-top: 8px;
  width: 437px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.p-img {
  float: left;
  border: 1px solid #ccc;
  padding: 10px;
  width: 81px;
  height: 81px;
}

.p-img img {
  width: 100%;
  height: 100%;
}

.p-msg {
  float: left;
  width: 210px;
  margin: 0 10px;
}

.p-msg .descript {
  margin-bottom: 15px;
  color: rgba(59, 59, 59, 1);
  font-size: 14px;
  font-weight: 400;
}

.p-msg .p-type {
  color: #807e7e;
  font-size: 14px;
}
.p-price {
  width: 120px;
  text-align: center;
}
.quantity-form {
  width: 92px;
  height: 22px;
}

.quantity-form a {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4px;
}
.p-num {
  width: 170px;
  display: flex;
  justify-content: center;
}
.decrement,
.increment {
  float: left;
  border: 1px solid #cacbcb;
  height: 22px;
  line-height: 22px;
  padding: 1px 0;
  width: 22px;
  text-align: center;
  color: #666;
  background: #fff;
  margin-left: -1px;
}
.itxt {
  float: left;
  border: 1px solid #cacbcb;
  width: 42px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  padding: 1px;
  margin-left: -1px;
  font-size: 12px;
  font-family: verdana;
  color: #333;
  -webkit-appearance: none;
}

.p-action {
  width: 115px;
  text-align: center;
}
.p-sum {
  font-weight: 700;
  width: 145px;
  text-align: center;
}
.cart-floatbar {
  height: 50px;
  border: 1px solid #f0f0f0;
  background: #fff;
  position: relative;
  margin-bottom: 50px;
  line-height: 50px;
}
.select-all {
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 16px 0 16px 9px;
  white-space: nowrap;
}
.select-all input {
  vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
}
.operation {
  float: left;
  width: 200px;
  margin-left: 40px;
}
.clear-all {
  font-weight: 700;
  margin: 0 20px;
}
.toolbar-right {
  float: right;
}
.amount-sum {
  float: left;
}
.amount-sum em {
  font-weight: 700;
  color: #e2231a;
  padding: 0 3px;
}
.price-sum {
  float: left;
  margin: 0 15px;
}
.price-sum em {
  font-size: 16px;
  color: #e2231a;
  font-weight: 700;
}
.btn-area {
  font-weight: 700;
  width: 94px;
  height: 52px;
  line-height: 52px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  background: #e54346;
  overflow: hidden;
  cursor: pointer;
}

</style>
