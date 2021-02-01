<template>
  <div class="auth-content">
    <div class="card">
      <div class="card-body text-center">
        <div class="mb-4">
          <img class="brand" src="../assets/logo.png" alt="logo">
        </div>
        <h6 class="mb-4 text-muted">Login to your account</h6>
        <form @submit.prevent="handleSubmit">
          <div class="form-group text-left">
            <label>Username</label>
            <input type="text" class="form-control" placeholder="Username" v-model="loginForm.username" :class="{ 'is-invalid': submitted && requiredField(loginForm.username) }">
            <div class="invalid-feedback" v-show="submitted && requiredField(loginForm.username)">
              Please enter a username.
            </div>
          </div>
          <div class="form-group text-left">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="loginForm.password" :class="{ 'is-invalid': submitted && requiredField(loginForm.password) }">
            <div class="invalid-feedback" v-show="submitted && requiredField(loginForm.password)">
              Please enter a password.
            </div>
          </div>
          <button class="btn btn-primary shadow-2 mb-4 w-100" @click="handleSubmit">
            Login<i class="fas fa-location-arrow ml-2" v-if="loading"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      submitted: false,
    }
  },
  created() {
    this.logout()
  },
  computed: {
    ...mapState({
      loading: state => state.userAccount.loading
    })
  },
  methods: {
    ...mapActions('userAccount', ['login', 'logout']),
    handleSubmit() {
      this.submitted = true;
      if(this.loginForm.username && this.loginForm.password){
        this.login(this.loginForm);
      }
    }
  }
}
</script>

<style scoped src="../../public/assets/css/auth.css">

</style>
