<template>
  <div id="app" class="wrapper" :class="{'login' : $route.name === 'Login'}" ref="mainContainer">
    <template v-if="$route.name !== 'Login'">
      <Sidebar :sidebarShow="sidebarShow"></Sidebar>
      <div id="body" class="active">
        <Header></Header>
        <div class="content">
          <Breadcrumb></Breadcrumb>
          <loading v-show="loading"></loading>
          <BackToTop></BackToTop>
          <router-view/>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<style>
</style>
<script>
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Loading from "@/components/Loading";
import BackToTop from "@/components/BackToTop";

export default {
  components: {BackToTop, Loading, Breadcrumb, Header, Sidebar},
  data() {
    return {
      sidebarShow: true,
      loading: false
    }
  },
  watch: {
    'windowWidth'() {
      if(this.windowWidth < 650) {
        this.sidebarShow = false
      }else {
        this.sidebarShow = true
      }
    },
    '$route.name'() {
      if(this.windowWidth < 650) {
        this.sidebarShow = false
      }
    }
  },
  mounted() {
    this.$bus.$on('loading', (event) => {
      this.loading = event
    });
  }
}
</script>

<style>
@import "../public/assets/vendor/bootstrap.min.css";
@import "../public/assets/css/master.css";
@import "../public/assets/vendor/fontawesome/css/fontawesome.min.css";
@import "../public/assets/vendor/fontawesome/css/solid.min.css";
@import "../public/assets/vendor/fontawesome/css/brands.min.css";
</style>
