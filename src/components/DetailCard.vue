<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-sm-4">
          <div class="icon-big text-center">
            <i class="text-info" :class="icon"></i>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="detail">
            <p class="detail-subtitle">{{ title }}</p>
            <span class="number">{{ count }}</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <hr/>
        <slot name="pushLink"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCard",
  props: {
    title: String,
    icon: String,
    count: Number
  }
}
</script>

<style scoped>

</style>
