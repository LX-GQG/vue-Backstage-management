<template>
  <div id="web_header">
    <div class="nav">
      <div class="nav-information">
        <ul>
          <li>
            <div v-if="custname!=null">
              <div style="color: #9795f0;margin-top:10px;font-size:12px">{{ "欢迎用户：" + this.$store.state.cust.custname }}</div>
            </div>
            <div v-else>
              <el-button type="text" class="bluebg" @click="loginDialogVisible = true">
                登录
              </el-button>
              &nbsp;&nbsp;|
              <el-button type="text" class="bluebg" @click="registerDialogVisible = true">
                注册
              </el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu">
        <div class="menu-place">
          <div class="menu-logo">
            <img src="../../assets/img/logofont.png" >
          </div>
          <div class="menu-nav">
            <ul>
              <li><router-link to="/indexMain" class="jianbian">首页</router-link></li>
              <li><router-link to="/terms" class="jianbian">关于我们</router-link></li>
            </ul>
          </div>
          <div class="menu-search">
            <!--搜索区域-->
            <el-input placeholder="请输入内容" clearable @focus="tzser">
              <el-button slot="append" icon="el-icon-search" ></el-button>
            </el-input>
          </div>
        </div>
    </div>
    <indexhome></indexhome>
    <indexphone></indexphone>
    <v-goTop></v-goTop>
    <indexfooter></indexfooter>
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
    <!-- 注册模块 -->
      <el-dialog title="注册" :visible.sync="registerDialogVisible" width="30%" @close="registerDialogClosed">
      <!--内容主体区域-->
      <el-form :model="registerForm" label-width="70px">
        <el-form-item label="用户名" prop="custlogin">
          <el-input v-model="registerForm.custlogin" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="custpass">
          <el-input v-model="registerForm.custpass" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="custname">
          <el-input v-model="registerForm.custname"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register" class="bluebg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import indexhome from '@/views/web/IndexHome'
import indexphone from '@/views/web/IndexPhone'
import indexfooter from '@/views/web/IndexFooter'
import ScrollTop from '@/views/web/AppTop'

export default {
  data () {
    return {
      iconcolor: '#b0b0b0',
      custname: JSON.parse(sessionStorage.getItem('cust')),
      loginDialogVisible: false, // 控制登录是否显示
      webcustFrom: {
        // 用户
        custlogin: '',
        custpass: ''
      },
      registerDialogVisible: false, // 控制注册是否显示
      registerForm: {
        // 用户
        custlogin: '',
        custpass: '',
        custname: '',
        phone: ''
      }
    }
  },
  methods: {
    tzser () {
      this.$router.push({path: '/indexSearch'})
    },
    // 监听登录对话框的关闭事件
    loginDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
    },
    // 监听注册对话框的关闭事件
    registerDialogClosed () {
    // 表单内容重置为空
      this.$refs.addFormRef.resetFields()
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
            alert('欢迎用户登录！')
            let data = resp.data.data
            let token = data.token
            let cust = data.cust
            // 存储token
            _this.$store.commit('SET_TOKENN', token)
            // 存储cust，优雅一点的做法是token和cust分开获取
            _this.$store.commit('SET_CUST', cust)
            // 将后台返回的token和user存在store
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
    register () {
      var _this = this
      if (!this.registerForm.custlogin) {
        alert('用户名不能为空！')
        return
      }
      if (!this.registerForm.custpass) {
        alert('密码不能为空！')
        return
      }
      if (!this.registerForm.custname) {
        alert('姓名不能为空！')
        return
      }
      if (!this.registerForm.phone) {
        alert('电话不能为空！')
        return
      }
      this.$axios
        .post('/cust/register', {
          custlogin: this.registerForm.custlogin,
          custpass: this.registerForm.custpass,
          custname: this.registerForm.custname,
          phone: this.registerForm.phone
        })
        .then((resp) => {
          let code = resp.data.code
          if (code === 200) {
            alert('注册成功')
            this.registerDialogVisible = false
          } else {
            alert('注册失败！')
          }
        })
    }
  },
  components: {
    indexhome,
    indexphone,
    indexfooter,
    'v-goTop': ScrollTop
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.cash{
  position:fixed;
  top:0;
  width:100%;
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
  position: relative;
  width: 100%;
  height: 40px;
  z-index: 99;
  background-image: linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%);
}
.nav-information{
  width: 1200px;
  height: 40px;
  margin: 0 auto;
  z-index: 99;
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
  height: 100%;
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
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
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
</style>
