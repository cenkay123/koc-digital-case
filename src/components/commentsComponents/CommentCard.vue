<template>
  <div class="card">
    <div class="card-header bg-info text-white h5">
      {{ comment.name }}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <footer class="blockquote-footer">{{ comment.body }}</footer>
        <small class="font-italic font-weight-bold float-right">
          {{ comment.email }}
        </small>
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: {
    comment: Object
  }
}
</script>

<style scoped>
.card-body small {
  font-size: 12px
}
</style>
