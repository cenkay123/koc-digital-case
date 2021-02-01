<template>
  <li>
    <router-link :to="{name: sidebarLink.route}" tag="a" :class="{active: $route.name === sidebarLink.route || $route.meta.parent === sidebarLink.route}">
      <i :class="sidebarLink.icon"></i>
      {{ sidebarLink.text }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: "SidebarLink",
  props: {
    sidebarLink: Object
  }
}
</script>

<style scoped>

</style>
