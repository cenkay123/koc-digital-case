<template>
  <button type="button" class="btn btn-info btn-circle back-top" v-show="scY > 300" @click="toTop">
    <i class="fa fa-arrow-up"></i>
  </button>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      scTimer: 0,
      scY: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
}
</script>

<style scoped>
.btn-circle {
  width: 50px;
  height: 50px;
  padding: 6px 0px;
  border-radius: 50px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}

.back-top {
  position: fixed;
  z-index: 999999;
  bottom: 5%;
  right: 2%;
}
</style>
