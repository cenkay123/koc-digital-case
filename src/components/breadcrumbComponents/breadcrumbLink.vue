<template>
  <li class="breadcrumb-item" :class="breadcrumbLink.routeName === $route.name ? 'active' : ''">
    <router-link :to="{name: breadcrumbLink.routeName}">{{ breadcrumbLink.name }}</router-link>
  </li>
</template>

<script>
export default {
  name: "breadcrumbLink",
  props: {
    breadcrumbLink: Object
  }
}
</script>

<style scoped>
.breadcrumb-item.active {
  pointer-events: none;
}
</style>
