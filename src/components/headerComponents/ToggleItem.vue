<template>
  <li :class="{active: $route.name === toggleItem.route || $route.meta.parent === toggleItem.route}">
    <router-link :to="{name: toggleItem.route}" class="dropdown-item">
      <i :class="toggleItem.icon"></i>
      {{ toggleItem.text }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ToggleItem",
  props: {
    toggleItem: Object
  }
}
</script>

<style scoped>
li.active {
  background: #2197f3;
  pointer-events: none;
}

li.active * {
  color: #fff!important;
}
</style>
