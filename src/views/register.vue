<template>
  <div id="register">
    <div class="register-nb">
      <form action="province/provincelist.html" method="post">
        <h4>CREAT AN AUCCOUNT</h4>
        <p>Username</p>
        <input type="text" name="loginName" v-model="loginFrom.loginName" placeholder="Please enter your account number"
          class="inputst" />
        <p class="pass">Password</p>
        <input type="password" name="password" v-model="loginFrom.password" placeholder="Please enter your password"
          class="inputst" />
        <p class="email">Email</p>
        <input type="text" name="email" v-model="loginFrom.email" placeholder="Please enter your email" class="inputst" />
        <div class="agree">
          <input type="checkbox" name="agree" value="agree" @click="checkbox()"/>
          Click to agree to the <router-link to="/Terms">terms</router-link>
        </div>
        <button type="button" class="dlo" @click="register()" :disabled="dis" :class="{btnBg:dis}">SING UP</button>
        <div class="tzhuang">
          <p>Have an account? <router-link :to="{name: 'Loginup'}">Loginup</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      dis: true,
      loginFrom: {
        loginName: '',
        password: '',
        email: '',
        agree: ''
      },
      responseResult: []
    }
  },
  methods: {
    checkbox () {
      if (this.loginFrom.agree != null) {
        this.dis = false
      } else {
        this.dis = true
      }
    },
    register () {
      var _this = this
      if (!this.loginFrom.loginName) {
        alert('用户名不能为空！')
        return
      }
      if (!this.loginFrom.password) {
        alert('密码不能为空！')
        return
      }
      if (!this.loginFrom.email) {
        alert('邮箱不能为空！')
        return
      }
      if (!this.loginForm.agree) {
        this.$axios
          .post('/register', {
            loginName: this.loginFrom.loginName,
            password: this.loginFrom.password,
            email: this.loginFrom.email
          })
          .then((resp) => {
            let code = resp.data.code
            if (code === 200) {
              alert('注册成功')
              let data = resp.data.data
              let token = data.token
              let user = data.user
              // 存储token
              _this.$store.commit('SET_TOKENN', token)
              // 存储user，优雅一点的做法是token和user分开获取
              _this.$store.commit('SET_USER', user)
              console.log(_this.$store.state.token)
              var path = this.$route.query.redirect
              this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
            } else {
              alert('注册失败！')
            }
          })
      }
    }
  }
}
</script>

<style>
  .register-nb {
    background-color: white;
    margin: 20% auto;
    width: 295px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 3px 3px 5px #282e43;
    position: relative;
  }

  #login .bgq .register-nb h4 {
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

  #login .bgq .register-nb .inputst {
    position: relative;
    margin-left: 19px;
    margin-top: 45px;
    padding: 8px;
    width: 233px;
    outline: none;
    border: none;
    margin-bottom: 8px;
    height: 28px;
    border: 1px solid #4B647E;
  }

  #login .bgq .register-nb p {
    color: #313A58;
    position: absolute;
    margin-left: 12px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    top: 47px;
    left: 8px;
    width: 250px;
    border-bottom: 1px #313A58 solid;
  }

  #login .bgq .register-nb .pass {
    position: absolute;
    margin-left: 12px;
    font-size: 14px;
    margin-top: 8px;
    font-weight: 400;
    top: 145px;
  }

  #login .bgq .register-nb .email {
    position: absolute;
    margin-left: 12px;
    font-size: 14px;
    margin-top: 8px;
    font-weight: 400;
    top: 243px;
  }

  #login .bgq .register-nb .dlo {
    margin-top: 15%;
    margin-left: 32px;
    width: 230px;
    height: 40px;
    border-radius: 10px;
    background-color: #455D78;
    color: white;
  }

  #login .bgq .register-nb .btnBg {
    margin-top: 18%;
    margin-left: 32px;
    width: 230px;
    height: 40px;
    border-radius: 10px;
    background-color: rgba(0,0,0,.25);
    border-color: #d9d9d9;
    color: #413c3c;
  }

  #login .bgq .register-nb .agree {
    position: absolute;
    left: 15px;
    top: 340px;
    font-size: 8px;
    color: #313A58;
  }

  .tzhuang {
    position: absolute;
    bottom: 96px;
  }

  #login .bgq .tzhuang p {
    text-align: center;
    font-size: 8px;
    border-bottom: none;
  }
</style>
