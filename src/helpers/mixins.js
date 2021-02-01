const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const mixins = {
  data () {
    return {
      windowWidth: document.body.clientWidth
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    requiredField(field) {
      return !field;
    },
    isEmailValid(field) {
      return !emailReg.test(field.toLowerCase())
    },
    onResize() {
      this.windowWidth = document.body.clientWidth
    }
  }
}
