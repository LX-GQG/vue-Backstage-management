<template>
  <div id="indexGoodList">
    <div class="indexgoodplace">
      <div class="indexgood">
        <img src="../../assets/img/ngg.jpg" >
      </div>
      <div class="indexgoodlist">
        <div class="goodtitle">
          <p style="font-size: 22px;">农产品</p>
        </div>
        <div class="goodmain">
          <div class="goodright">
            <ul>
              <li>
                <router-link to="">
                  <div class="xuanfulo">
                    <img src="../../assets/img/mguo.jpg" alt="photo" style="width:230px;height:614px">
                  </div>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <div class="xuanfulow">
                    <img src="../../assets/img/lanmei.jpg" alt="photo" style="width:230px;height:614px">
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="goodleft">
            <ul>
              <li class="brick-item" :data="goodsList" v-for="(item,index) in goodsList" :key="index" @click="getgood(item.commid)">
                <router-link to="" >
                  <div class="xuanfu">
                    <div class="figure">
                      <img :src="'/static'+item.picture" >
                    </div>
                    <h3>{{ item.commname }}</h3>
                    <p>{{ item.commdesc }}</p>
                    <p class="price">
                      <span class="num">{{ item.commoney }}</span>元<span>起</span>
                    </p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodsLists } from '@/api/goods.js'

export default {
  data () {
    return {
      goodsList: [] // 商品列表
    }
  },
  components: {},
  created () { // 生命周期函数
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      goodsLists()
        .then((res) => {
          if (res.data.code === 200) {
            // 商品列表
            this.goodsList = res.data.data
            console.log(res)
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getgood (commid) {
      // 跳转到商品详情拼接id
      this.$router.push({ path: '/indexXingq/' + commid })
    }
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    background-color: #F5F5F5;
  }
  ul li{
    list-style: none;
  }
  a{
    text-decoration: none;
    color: #000000;
  }
  #indexGoodList{
    width: 100%;
    position: relative;

  }
  .indexgoodplace{
    width: 1250px;
    margin: 0 auto;
  }
  .indexgood{
    position: relative;
    margin: 22px auto;
  }
  .indexgood img{
    width: 1200px;
    margin-left: 24px;
  }
  .indexgoodlist{
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .indexgoodlist .goodtitle{
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 100;
  }
  .goodmain {
    width: 1200px;
    height: 1255px;
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .goodmain .goodright{
    position: absolute;
    top: 15px;
    left: 0;
  }
  .goodmain .goodright ul li{
    margin: 0;
    padding: 0;
  }
  .goodmain .goodleft{
    position: absolute;
    width: 970px;
    left: 234px;
    top: -5px;
  }

  .goodmain .goodleft ul li{
    float: left;
    margin-left: 15px;
    margin-bottom: 14px;
  }
  .xuanfulo{
    width: 230px;
    height: 614px;
    margin-top: -20px;
    background-color: #fff;
  }
  .xuanfulo:hover{
    transform: translateY(-3px);
    transition: all .2s ease-out;
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, .3);
    border-color: #eee;
  }
  .xuanfulow{
    width: 230px;
    height: 614px;
    margin-top: 15px;
    background-color: #fff;
  }
  .xuanfulow:hover{
    transform: translateY(-3px);
    transition: all .2s ease-out;
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, .3);
    border-color: #eee;
  }
  .xuanfu{
    width: 230px;
    height: 300px;
    margin-top: -20px;
    background-color: #fff;
  }
  .xuanfu:hover{
    transform: translateY(-3px);
    transition: all .2s ease-out;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .3);
    border-color: #eee;
  }

  .brick-item {
      height: 300px;
      padding: 0;
  }
  .brick-item>a {
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
  .brick-item{
    opacity:0.7;
  }
  .brick-item:hover{
    opacity: 1;
  }
  .brick-item h3{
    font-size: 15px;
    font-weight: 200;
    text-align: center;
  }
  .brick-item p{
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
  .brick-item .price del{
    color: #b0b0b0;
  }
</style>
