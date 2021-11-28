<template>
  <div id="indexGoodList">
    <div class="nav">
      <div class="nav-information">
        <ul>
          <li>
            <div>
              <div style="color: #9795f0;margin-top:10px;font-size:10px">{{ "欢迎用户：" + this.custname }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menus">
      <div class="menu-place">
        <div class="menu-logo">
          <router-link to="/indexMain">
            <img src="../../assets/img/logofont.png" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="xiangqing" :data="bygoods" :model="buyForm">
      <input type="text" hidden="hidden" model="buyForm.custid">
      <div class="xiangqhe">
        <div class="xqleft">
          <ball :minIMGsrc="'/static'+bygoods.picture" alt="" :scale="3"/>
        </div>
        <div class="xqright" >
          <div class="xqrtitle" >
            <p hidden="hidden" model="buyForm.commid">{{ bygoods.commid }}</p>
            <h3 model="">{{ bygoods.commname }}</h3>
          </div>
          <p>{{ bygoods.commdesc }}</p>
          <div class="prize_bar">
            <div class="show_prize fl">￥<em model="buyForm.commoney">{{ bygoods.commoney }}</em></div>
            <div class="show_unit fl">单位：{{ bygoods.size }}</div>
          </div>
          <div class="kucun">剩余库存：{{ bygoods.inventory }}</div>
          <div class="goods_num clearfix">
            <el-input-number v-model="salemount" @change="handleChange" :min="1" :max="100" label="购买数量"></el-input-number>
          </div>
          <div class="buytype">
            支付:&nbsp;&nbsp;
            <i class="mayi"></i> &nbsp;&nbsp;&nbsp;&nbsp;蚂蚁花呗  <i class="xyk"></i> &nbsp;&nbsp;&nbsp;&nbsp;信用卡支付  <i class="wczf"></i> &nbsp;&nbsp;&nbsp;&nbsp;微信支付
          </div>
          <div class="total">总价：<em>{{ allmoney }}元</em></div>
          <div class="operate_btn">
            <a class="buy_btn" @click="BuyGood">立即购买</a>
          </div>
          <div class="tishi">
            <p>温馨提示·不支持7天无理由退货</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录模块 -->
    <el-dialog title="登录" :visible.sync="loginDialogVisible" width="30%" @close="loginDialogClosed">
    <!--内容主体区域-->
    <el-form :model="webcustFrom" label-width="70px">
      <el-form-item label="用户名" prop="custlogin">
        <el-input v-model="webcustFrom.custlogin"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="custpass">
        <el-input v-model="webcustFrom.custpass" show-password></el-input>
      </el-form-item>
    </el-form>
    <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
    <v-goTop></v-goTop>
    <indexfooter></indexfooter>
  </div>
</template>

<script>
import { BynameGood } from '@/api/goods.js'
import { saleAdd } from '@/api/sale.js'
import indexfooter from '@/views/web/IndexFooter'
import ScrollTop from '@/views/web/AppTop'
import ball from '@/views/web/ball'

export default {
  name: 'indexXingq',
  data () {
    return {
      showLoading: false,
      commid: this.$route.params.commid, // id在接口处拼接
      bygoods: [], // 商品列表
      // 购买数量
      custname: '',
      custid: '',
      salemount: 1, // 默认购买1个
      allmoney: 0,
      sesionxx: [],
      loginDialogVisible: false, // 控制登录是否显示
      webcustFrom: {
        // 用户
        custlogin: '',
        custpass: ''
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
    'v-goTop': ScrollTop,
    ball
  },
  created () {
    this.getGood()
  },
  mounted () {
    this.getname()
  },
  methods: {
    tzser () {
      this.$router.push({path: '/indexSearch'})
    },
    // 按钮封装点击
    clickShadowBtn () {
      // 点击按钮执行逻辑
      this.showLoading = true
      // 请求接口提交逻辑
    },
    getname () {
      var sionlist = JSON.parse(sessionStorage.getItem('cust'))
      this.custname = sionlist.custname
    },
    // 监听登录对话框的关闭事件
    loginDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    handleChange () {
      this.allmoney = this.bygoods.commoney * this.salemount
    },
    getGood () {
      BynameGood(this.commid)
        .then((res) => {
          if (res.data.code === 0) {
            this.bygoods = res.data.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    login () {
      var _this = this
      // 登录
      if (!this.webcustFrom.custlogin) {
        alert('用户名不能为空！')
        return
      }
      if (!this.webcustFrom.custpass) {
        alert('密码不能为空！')
        return
      }
      this.$axios
        .post('/cust/login', {
          custlogin: this.webcustFrom.custlogin,
          custpass: this.webcustFrom.custpass
        })
        .then((resp) => {
          let code = resp.data.code
          if (code === 200) {
            alert('登录成功')
            let data = resp.data.data
            let token = data.token
            let cust = data.cust
            // 存储token
            _this.$store.commit('SET_TOKENN', token)
            // 存储cust，优雅一点的做法是token和cust分开获取
            _this.$store.commit('SET_CUST', cust)
            console.log(_this.$store.state.token)
            this.custname = data.cust.custname
            console.log(this.custname)
            if (this.custname) {
              this.showname = true
              this.loginDialogVisible = false
            } else {
              this.showname = false
            }
          } else {
            alert('登录失败，账号或者密码错误！')
          } if (code === 400) {
            this.$message.error(resp.data.message)
          }
        })
    },
    BuyGood () {
      console.log(sessionStorage.getItem('cust'))
      var sionlist = JSON.parse(sessionStorage.getItem('cust'))
      // 判断是否已经登录，未登录则进行跳转
      if (!sessionStorage.getItem('cust')) {
        this.$message.error('请登录')
      } else {
        this.buyForm.custid = sionlist.custid
        this.buyForm.commid = this.bygoods.commid
        this.buyForm.salemount = this.salemount
        this.buyForm.salemoney = this.bygoods.commoney
        saleAdd(this.buyForm)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '购买成功',
                type: 'success'
              })
            } else {
              this.$message.error('购买失败')
            } if (res.data.code === 201) {
              this.$message.error(res.data.message)
            }
          })
      }
    }
  }
}
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
}
.cash{
  position:fixed;
  top:0;
  width:100%;
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
.tishi{
  margin-top: 10px;
  font-size: 13px;
  color: #666;
}
.buytype{
  position: relative;
  font-size: 13px;
  margin-top: 18px;
}
.mayi{
  position: absolute;
  top: 2px;
  width: 14px;
  height: 14px;
  background-image: url(../../assets/img/mayi.png);
  background-size: 14px;
  background-position: 0px 0px;
}
.xyk{
  position: absolute;
  top: 2px;
  width: 14px;
  height: 15px;
  background-image: url(../../assets/img/xyk.png);
  background-size: 14px;
}
.wczf{
  position: absolute;
  top: 2px;
  width: 14px;
  height: 15px;
  background-image: url(../../assets/img/wczf.png);
  background-size: 14px;
}
.kucun{
  font-size: 13px;
  color: #858585;
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
.menus {
  width: 100%;
  height: 120px;
  position: relative;
}
.menus .menu-place {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.menus .menu-place .menu-logo {
  position: absolute;
}
.menus .menu-place .menu-logo img {
  width: 120px;
  height: 50px;
  margin-top: 20px;
  margin-left: 5px;
}
.menus .menu-place .menu-nav {
  position: absolute;
  left: 300px;
  top: 45px;
}
.menus .menu-place .menu-nav ul li .jianbian {
  background: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.menus .menu-place .menu-nav ul li {
  float: left;
  margin-left: 35px;
}
.menus .menu-place .menu-search {
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
  width: 475px;
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
.goods_num .label .btn_minute{
  width: 30px;
  height: 30px;
  font-size: 25px;
}
.goods_num .label input{
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
.operate_btn .buy_btn:hover{
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
}
.operate_btn .buy_btn{
  display: inline-block;
  width: 178px;
  height: 38px;
  border: 1px solid #971c1c;
  font-size: 14px;
  color: #c40000;
  line-height: 38px;
  text-align: center;
  background-image: linear-gradient(to top, #feada6 0%, #f5efef 100%);
}
</style>
