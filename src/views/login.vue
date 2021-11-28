<template>
  <div id="login">
    <div class="bgq">
      <div class="login-r">
        <div class="logo">
          <img src="../assets/img/logo.png">
        </div>
        <p>SIGN UP.</p>
        <span>We're better together</span>
      </div>
      <div class="login-main">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  methods: {}
}
</script>

<style>
  body {
    background-color: aliceblue;
  }

  #login {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 2%;
  }

  #login .bgq {
    width: 1336px;
    height: 680px;
    margin: 0% 6%;
    border-radius: 10px;
    background-size: 100% 100%;
    background-image: url(../assets/img/piqsels.com-id-srsep.jpg);
    background-repeat: no-repeat;
    box-shadow: 2px 2px 5px #000;
    position: relative;
    min-width: 800px;
    min-height: 600px;
  }

  #login .logo img {
    width: 80px;
    height: 80px;
    margin: 10px;
  }

  #login .bgq .login-r p {
    color: white;
    font-size: 65px;
    position: absolute;
    left: 30px;
    top: 145px;
    font-family: "fantasy";
  }

  #login .bgq .login-r span {
    color: white;
    font-size: 20px;
    position: absolute;
    left: 35px;
    top: 285px;
    font-family: "fantasy";
    font-weight: 50;
  }

  #login .bgq .login-main {
    position: absolute;
    right: 0;
    width: 380px;
    top: 0px;
    margin: 0 auto;
    height: 679px;
    background-color: #455D78;
    border-radius: 0 5px 5px 0;
    box-shadow: 3px 3px 5px #282e43;
  }

  #login .bgq .login-nb {
    background-color: white;
    margin: 20% auto;
    width: 295px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 3px 3px 5px #282e43;
    position: relative;
  }

  #img-vcode {
    width: 56px;
    height: 21px;
    float: right;
    position: relative;
    top: 2px;
    left: -6px
  }
</style>
