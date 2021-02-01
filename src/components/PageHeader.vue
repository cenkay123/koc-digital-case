<template>
  <div class="row">
    <div class="col-md-12 page-header px-4">
      <div class="page-pretitle">Overview</div>
      <h2 class="page-title">{{ pageName }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    pageName: String
  }
}
</script>

<style scoped>

</style>
