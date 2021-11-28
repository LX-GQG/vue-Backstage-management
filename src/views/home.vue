<template>
  <div id="home">
    <el-container>
      <!--顶部-->
      <el-header style=" width: 100%" class="home_main">
        <span class="nav-logo"><img src="../assets/img/logo.png" ></span>
        <span class="head-title">
          <img src="../assets/img/logofont.png" >
        </span>
        <span id="welcome">
          <i>Welcome to <i class="teshu">{{ this.$store.state.user.username }}</i> produce sales and inventroy system!</i>
        </span>
        <el-avatar
          icon=""
          class="www"
          style="color: #222; float: right; padding: 0px; margin-top: 10px;"
          >
        </el-avatar>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="13%" class="menu">
          <el-menu
            :default-active="$route.path"
            router
            text-color="white"
            active-text-color="#409EFF"
            background-color="#545c64"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              v-for="(item, i) in navList"
              :key="i"
              :index="item.name"
            >
              <i :class="item.icon"></i>
              {{ item.title }}
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                进货管理
              </template>
              <el-menu-item index="/stock">
                <i class="el-icon-document-remove" ></i>
                <span style="color:white;font-size:13px">商品进货</span>
              </el-menu-item>
              <el-menu-item index="/refund">
                <i class="el-icon-box" ></i>
                <span style="color:white;font-size:13px">退货查询</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-shopping-cart-full"></i>
                销售管理
              </template>
              <el-menu-item index="/sale">
                <i class="el-icon-shopping-bag-1" ></i>
                <span style="color:white;font-size:13px">商品销售</span>
              </el-menu-item>
              <el-menu-item index="/rtsale">
                <i class="el-icon-files" ></i>
                <span style="color:white;font-size:13px">商品退货查询</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-more-outline"></i>
                其他管理
              </template>
              <el-menu-item index="/report">
                <i class="baobiao" ></i>
                <span style="color:white;font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;统计报表</span>
              </el-menu-item>
              <el-menu-item index="/sildeshow">
                <i class="sildeshow" ></i>
                <span style="color:white;font-size:13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;轮播图</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--路由占位符-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      usernameti: this.$store.state.user.username,
      navList: [
        { name: '/index', title: '首页', icon: 'el-icon-s-home' },
        { name: '/user', title: '用户管理', icon: 'el-icon-s-custom' },
        { name: '/good', title: '商品管理', icon: 'el-icon-s-shop' },
        { name: '/cust', title: '客户管理', icon: 'el-icon-s-check' },
        { name: '/provider', title: '供应商管理', icon: 'el-icon-truck' }
      ]
    }
  }
}
</script>

<style >
body{
  margin: 0;
  padding: 0;
}
.home-container{
  width: 100%;
  height: 100%;
}
.home_main{
  border-bottom: 1px #e6e6e6 solid;
  background-color: #F0F8FF;
  background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
  color: white;
}
.teshu{
  color: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
}
.nav-logo{
  position: absolute;
  left: 0;
  width: 13%;
  height: 60px;

}
.www{
  background-image: url(../assets/img/touxiang.jpg);
  background-position: -5px -2px;
  background-size: 60px;
}
.nav-logo img{
  position: absolute;
  padding-top: 0px;
  left: 30%;
  width: 60px;
}

.head-title {
  position: absolute;
  margin-top: 15px;
  left: 15%;
}
.head-title img{
  width: 100px;
  height: 30px;
}
#welcome{
  position: absolute;
  right: 80px;
  top: 25px;
  color: #000000;
  font-size: 10px;
}

.el-menu-vertical-demo{
  height: 89vh;
}

.menu{
  border-right: solid 1px #e6e6e6;
}
.baobiao{
  background-image: url(../assets/img/baobiao.png);
  background-position: 0px 1px;
  background-size: 18px;
  position: absolute;
  width: 18px;
  left: 45px;
  top: 16px;
  height: 18px;
}
.sildeshow{
  background-image: url(../assets/img/sildeshow.png);
  background-position: 0px 1px;
  background-size: 18px;
  position: absolute;
  width: 18px;
  left: 45px;
  top: 16px;
  height: 18px;
}
</style>
