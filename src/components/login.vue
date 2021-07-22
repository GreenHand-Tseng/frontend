<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        高校科研创新平台
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <!--          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />-->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <!--          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="login">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="" id="el-login-footer">
      <span v-html="" />
      <span> ⋅ </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{  }}</a>
    </div>
  </div>
</template>

<script>
import Background from '@/assets/images/background.jpg'
export default {
  name: "Login",
  data() {
    return {
      Background: Background,
      loginForm: {
        username: 'admin',
        password: 'admin',
        rememberMe: false,
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const data = route.query
        if (data && data.redirect) {
          this.redirect = data.redirect
          delete data.redirect
          if (JSON.stringify(data) !== '{}') {
            this.redirect = this.redirect + '&' + qs.stringify(data, { indices: false })
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      const _this = this
      console.log(this.$store.state)
      // console.log(this.loginForm.username)
      // console.log(this.loginForm.password)
      this.$axios
        .post('/login',this.loginForm)
        .then(successResponse => {
          // console.log(successResponse)
          if(successResponse.status === 200){
            // this.$cookies.set('user', successResponse)
            // this.$cookies.set("JSESSIONID",this.$session.key,0,'/','');

            _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            // console.log(this.$route)

            // _this.$route.replace('/manage')
            // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            this.$router.replace({path:'/manage'})
          }
        })
        .catch(failResponse => {
          console.log('aaaaaaaa')
        })
    }
  }
}
</script>

<style >
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;

}
.login-form .el-input {
  height: 38px;

}
.login-form .el-input input {
  height: 38px;
}
.login-form .input-icon{
  height: 39px;width: 14px;margin-left: 2px;
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

</style>




