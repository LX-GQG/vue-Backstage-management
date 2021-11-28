<template>
  <div id="indexGoodList">
    <div class="nav">
      <div class="nav-information">
        <ul>
          <li>
            <div>
              <div style="color: #9795f0; margin-top: 10px; font-size: 10px">
                {{ "欢迎用户：" + this.custname }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menut">
      <div class="menu-place">
        <div class="menu-logo">
          <router-link to="/indexMain">
            <img src="../../assets/img/logofont.png" />
          </router-link>
        </div>
        <div class="menu-search">
          <!--搜索区域-->
          <el-input
            placeholder="搜索商品"
            clearable
            v-model="queryInfo.keyword"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodname"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="daohang">
      <div class="dhwz">
        <div class="dhtitle">全部商品</div>
      </div>
      <div class="dhxx">
        <div class="dhzh">
          <button>综合 <i class="el-icon-bottom"></i></button>
        </div>
      </div>
    </div>
    <div class="goodser">
        <div class="goodleft">
            <ul>
                <li
                class="brick-item"
                :data="goodsList"
                v-for="(item, index) in goodsList"
                :key="index"
                @click="getgood(item.commid)"
                >
                <router-link to="">
                    <div class="xuanfu">
                    <div class="figure">
                        <img :src="'/static' + item.picture" />
                    </div>
                    <h3>{{ item.commname }}</h3>
                    <p>{{ item.commdesc }}</p>
                    <p class="price">
                        <span class="num">{{ item.commoney }}</span
                        >元<span>起</span>
                    </p>
                    </div>
                </router-link>
                </li>
            </ul>
        </div>
    </div>
    <v-goTop></v-goTop>
    <indexfooter></indexfooter>
  </div>
</template>

<script>
import { BynameGood, SelectGood } from '@/api/goods.js'
import indexfooter from '@/views/web/IndexFooter'
import ScrollTop from '@/views/web/AppTop'

export default {
  name: 'indexXingq',
  data () {
    return {
      commid: this.$route.params.commid, // id在接口处拼接
      bygoods: [], // 商品列表
      goodsList: [],
      // 购买数量
      custname: '',
      custid: '',
      salemount: 1, // 默认购买1个
      allmoney: 0,
      sesionxx: [],
      queryInfo: {
        keyword: '' // 查询参数
      },
      buyForm: {
        custid: '',
        commid: '',
        salemount: '',
        commoney: ''
      }
    }
  },
  components: {
    indexfooter,
    'v-goTop': ScrollTop
  },
  created () {
    this.getGoodname()
  },
  mounted () {
    this.getname()
  },
  methods: {
    getGoodname () {
      SelectGood(this.queryInfo.keyword)
        .then((res) => {
          if (res.data.code === 200) {
            // 商品列表
            console.log(res)
            this.goodsList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getname () {
      var sionlist = JSON.parse(sessionStorage.getItem('cust'))
      this.custname = sionlist.custname
    },
    getgood (commid) {
      // 跳转到商品详情拼接id
      this.$router.push({ path: '/indexXingq/' + commid })
    }
  }
}
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
a {
  text-decoration: none;
  color: white;
}
#web_header {
  width: 100%;
  height: 90px;
  position: relative;
}
em {
  font-style: normal;
}
.goodser{
  width: 100%;
  height: 1250px;
  margin-bottom: 20px;
}
.goodleft {
  margin: 0 auto;
  position: relative;
  width: 1225px;
}
.goodleft ul li {
  float: left;
  margin-left: 15px;
  margin-bottom: 14px;
}
.xuanfulo {
  width: 230px;
  height: 614px;
  margin-top: -20px;
  background-color: #fff;
}
.xuanfulo:hover {
  transform: translateY(-3px);
  transition: all 0.2s ease-out;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.3);
  border-color: #eee;
}
.xuanfu {
  width: 230px;
  height: 300px;
  margin-top: -20px;
  background-color: #fff;
}
.xuanfu:hover {
  transform: translateY(-3px);
  transition: all 0.2s ease-out;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  border-color: #eee;
}
.brick-item {
  height: 300px;
  padding: 0;
}
.brick-item > a {
  display: block;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px 0;
  width: 225px;
}
.brick-item .figure img {
  width: 160px;
  height: 160px;
  margin: 30px 33px;
}
.brick-item h3 {
  font-size: 15px;
  font-weight: 200;
  text-align: center;
}
.brick-item p {
  font-size: 10px;
  font-weight: 50;
  text-align: center;
  color: #b0b0b0;
}
.brick-item .title {
  margin: 0 10px 2px;
}
.brick-item .desc {
  margin: 0 10px 10px;
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
}
.brick-item .price {
  margin: 0 10px 14px;
}

.brick-item .price {
  margin: 0 10px 10px;
  text-align: center;
  color: #ff6700;
}
.brick-item .price del {
  color: #b0b0b0;
}
.nav {
  width: 100%;
  height: 40px;
  background-image: linear-gradient(
    to top,
    #fad0c4 0%,
    #fad0c4 1%,
    #ffd1ff 100%
  );
}
.nav-information {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
}
.nav .nav-information ul {
  float: right;
}
.nav .nav-information ul li {
  float: left;
}
.nav .nav-information ul li .bluebg {
  color: #858585;
}
.nav .nav-information ul li .one {
  line-height: 40px;
  margin-left: 18px;
  font-size: 13px;
  color: #858585;
}
.nav .nav-information ul li .el-icon-shopping-cart-2 {
  margin-left: 15px;
}
.nav .nav-information ul li .cartweizhi {
  line-height: 40px;
  font-size: 13px;
  color: #858585;
}
.daohang {
  width: 100%;
}
.daohang .dhwz {
  width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #fdcbf1;
  margin-bottom: 22px;
}
.daohang .dhwz .dhtitle {
  width: 200px;
  height: 45px;
  text-align: center;
  color: #9548b1;
  line-height: 45px;
  font-size: 18px;
  background-image: linear-gradient(
    to top,
    #fdcbf1 0%,
    #fdcbf1 1%,
    #e6dee9 100%
  );
  border: 1px solid #fbc2eb;
  margin-bottom: 2px;
}
.daohang .dhxx {
  width: 1200px;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
  margin-bottom: 30px;
  background-color: #e6dada;
  border: 1px solid #ccc;
}
.daohang .dhxx .dhzh {
  margin-left: 10px;
}
.daohang .dhxx .dhzh button {
  padding: 3px 5px;
  border: 1px solid #ccc;
  color: white;
  background-color: rgb(252, 93, 35);
}
.menut {
  width: 100%;
  height: 120px;
  position: relative;
}
.menut .menu-place {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.menut .menu-place .menu-logo {
  position: absolute;
}
.menut .menu-place .menu-logo img {
  width: 120px;
  height: 50px;
  margin-top: 20px;
  margin-left: 5px;
}
.menut .menu-place .menu-nav {
  position: absolute;
  left: 300px;
  top: 45px;
}
.menut .menu-place .menu-nav ul li .jianbian {
  background: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.menut .menu-place .menu-nav ul li {
  float: left;
  margin-left: 35px;
}
.menut .menu-place .menu-search {
  position: absolute;
  right: 32%;
  top: 35px;
  width: 350px;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
ul li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000000;
}
.xiangqing {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.xiangqing .xiangqhe {
  height: 600px;
}
.xiangqing .xqleft {
  float: left;
  margin-bottom: 20px;
}
.xiangqing .xqleft img {
  width: 435px;
  height: 540px;
}
.xiangqing .xqright {
  width: 480px;
  float: left;
  margin-left: 150px;
}
.xiangqing .xqright .xqrtitle {
  font: 1000 20px Arial, "microsoft yahei";
  color: #666;
  padding-top: 10px;
  line-height: 28px;
  margin-bottom: 13px;
}
.goods_detail_list {
  width: 730px;
  height: 350px;
}
.goods_detail_list h3 {
  font-size: 24px;
  line-height: 24px;
  color: #666;
  font-weight: normal;
}
.goods_detail_list p {
  color: #666;
  line-height: 40px;
}
.prize_bar {
  height: 72px;
  background-color: #fff5f5;
  line-height: 72px;
  margin-top: 10px;
}
.prize_bar .show_prize {
  font-size: 20px;
  color: #ff3e3e;
  padding-left: 20px;
  float: left;
}
.prize_bar .show_pirze em {
  font-style: normal;
  font-size: 36px;
  padding-left: 10px;
}
.prize_bar .show_unit {
  padding-left: 210px;
}
.goods_num {
  height: 52px;
  margin-top: 19px;
  /*background: yellow;*/
}
.goods_num .num_name {
  width: 70px;
  height: 52px;
  line-height: 52px;
}
.goods_num .label {
  font-size: 16px;
  color: #666;
}
.goods_num .label .btn_minute {
  width: 30px;
  height: 30px;
  font-size: 25px;
}
.goods_num .label input {
  height: 30px;
}
.total {
  height: 35px;
  line-height: 35px;
  margin-top: 90px;
  /*background: yellow;*/
}
.total em {
  font-style: normal;
  color: #ff3e3e;
  font-size: 18px;
}
.operate_btn {
  height: 40px;
  margin-top: 35px;
  font-size: 0;
  position: relative;
}
.operate_btn .buy_btn,
.operate_btn .add_cart {
  display: inline-block;
  width: 178px;
  height: 38px;
  border: 1px solid #c40000;
  font-size: 14px;
  color: #c40000;
  line-height: 38px;
  text-align: center;
  background-color: #ffeded;
}
.operate_btn .add_cart {
  background-color: #c40000;
  color: #fff;
  margin-left: 10px;
  position: relative;
  z-index: 10;
}
</style>
