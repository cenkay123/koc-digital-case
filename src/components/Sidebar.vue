<template>
  <nav id="sidebar" :class="{'active': !sidebarShow}">
    <div class="sidebar-header">
      <img src="../assets/logo.png" alt="logo" class="app-logo" width="40">
      <span class="name pull-left text-black-50 pl-1">Koc Digital Case</span>
    </div>
    <ul class="list-unstyled components text-secondary">
      <SidebarLink v-for="(sidebarLink, idx) in sidebarLinks" :key="idx" :sidebarLink="sidebarLink"></SidebarLink>
    </ul>
  </nav>
</template>

<script>
import SidebarLink from "@/components/sidebarComponents/SidebarLink";
export default {
  name: 'Sidebar',
  components: {SidebarLink},
  data() {
    return {
      sidebarLinks: [
        {
          text: 'Dashboard',
          icon: 'fas fa-home',
          route: 'Home'
        },
        {
          text: 'Customers',
          icon: 'fas fa-users',
          route: 'Customers'
        },
        {
          text: 'Comments',
          icon: 'fas fa-comment',
          route: 'Comments'
        }
      ]
    }
  },
  props: {
    sidebarShow: Boolean
  }
};
</script>

<style scoped>

</style>
