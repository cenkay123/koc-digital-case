<template>
  <div class="alert w-100" :class="'alert-'+type">{{text}}</div>
</template>

<script>
export default {
  name: "EmptyDataAlert",
  props: {
    text: String,
    type: String
  }
}
</script>

<style scoped>

</style>
