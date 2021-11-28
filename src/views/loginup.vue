<template>
  <div id="loginup">
    <div class="login-nb">
      <el-form action="province/provincelist.html" method="post" :model="loginForm">
        <h4>LOG IN TO YOUR ACCOUNT</h4>
        <p>Username</p>
        <input type="text" v-model="loginForm.loginName" placeholder="Please enter your account number"
          class="inputst" />
        <p class="pass">Password</p>
        <input type="password" v-model="loginForm.password" placeholder="Please enter your password"
          class="inputst" />
        <div class="agree">
          <input type="checkbox" name="agree" value="" @click = "checkbox()"/>
          Click to agree to the <router-link to="/Terms">terms</router-link>
        </div>
        <button type="button" class="dlo" @click="login" :disabled = "dis" :class="{btnBg:dis}">SING UP</button>
        <div class="tzhuango">
          <p>Not a Number? <router-link :to="{name: 'Register'}">register</router-link>
          </p>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Loginup',
  data () {
    return {
      dis: true,
      loginForm: {
        loginName: '',
        password: '',
        agree: ''
      },
      responseResult: []
    }
  },
  methods: {
    checkbox () {
      if (this.loginForm.agree != null) {
        this.dis = false
      } else {
        this.dis = true
      }
    },
    login () {
      var _this = this
      // 登录
      if (!this.loginForm.loginName) {
        alert('用户名不能为空！')
        return
      }
      if (!this.loginForm.password) {
        alert('密码不能为空！')
        return
      }
      if (!this.loginForm.agree) {
        this.$axios
          .post('/login', {
            loginName: this.loginForm.loginName,
            password: this.loginForm.password
          })
          .then((resp) => {
            let code = resp.data.code
            if (code === 200) {
              alert('登录成功')
              let data = resp.data.data
              let token = data.token
              let user = data.user
              // 存储token
              _this.$store.commit('SET_TOKENN', token)
              // 存储user，优雅一点的做法是token和user分开获取
              _this.$store.commit('SET_USER', user)
              console.log(_this.$store.state.token)
              var path = this.$route.query.redirect
              this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
            } else {
              alert('登录失败，账号或者密码错误！')
            }
          })
      }
    }
  },
  computed: {
  }
}
</script>

<style>
  #login .bgq .login-nb h4 {
    margin-left: 18px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding-top: 10px;
    color: #4B5B78;

  }

  ::placeholder {
    color: #4B647E;
    font-size: 8px;
  }

  #login .bgq .login-nb .inputst {
    position: relative;
    margin-left: 19px;
    margin-top: 50px;
    padding: 8px;
    width: 233px;
    outline: none;
    border: none;
    margin-bottom: 8px;
    height: 28px;
    border: 1px solid #4B647E;
  }

  #login .bgq .login-nb p {
    color: #313A58;
    position: absolute;
    margin-left: 12px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    top: 50px;
    left: 8px;
    width: 250px;
    border-bottom: 1px #313A58 solid;
  }

  #login .bgq .login-nb .pass {
    position: absolute;
    margin-left: 12px;
    font-size: 14px;
    margin-top: 5px;
    font-weight: 400;
    top: 155px;
  }

  #login .bgq .login-nb .dlo {
    margin-top: 18%;
    margin-left: 32px;
    width: 230px;
    height: 40px;
    border-radius: 10px;
    background-color: #455D78;
    color: white;
  }

  #login .bgq .login-nb .btnBg {
    margin-top: 18%;
    margin-left: 32px;
    width: 230px;
    height: 40px;
    border-radius: 10px;
    background-color: rgba(0,0,0,.25);
    border-color: #d9d9d9;
    color: #413c3c;
  }

  #login .bgq .login-nb .agree {
    position: absolute;
    left: 16px;
    top: 248px;
    font-size: 8px;
    color: #313A58;
  }

  .tzhuango {
    position: absolute;
    bottom: 100px;
  }

  #login .bgq .tzhuango p {
    text-align: center;
    font-size: 8px;
    border-bottom: none;
  }
</style>
