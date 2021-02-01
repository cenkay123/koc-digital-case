<template>
  <nav class="navbar navbar-expand-lg navbar-white bg-white navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
    <button type="button" class="btn btn-light" @click="$parent.$data.sidebarShow = !$parent.$data.sidebarShow">
      <i class="fas fa-bars"></i>
      <span></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <div class="nav-dropdown">
            <a class="nav-item nav-link dropdown-toggle text-secondary nav-item nav-link dropdown-toggle text-secondary d-flex align-items-center"
               @click="userToggle = !userToggle">
              <div class="pr-1">{{ session.username }}</div>
              <i style="font-size: .8em;" class="fas fa-caret-down"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right nav-link-menu" :class="userToggle ? 'show' : ''">
              <ul class="nav-list">
                <ToggleItem v-for="(toggleItem, idx) in toggleItems" :key="idx" :toggleItem="toggleItem"></ToggleItem>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
import ToggleItem from "@/components/headerComponents/ToggleItem";

export default {
  name: 'Header',
  components: {ToggleItem},
  data() {
    return {
      userToggle: false,
      toggleItems: [
        {
          text: 'Comments',
          icon: 'fas fa-comment',
          route: 'Comments'
        },
        {
          text: 'Logout',
          icon: 'fas fa-sign-out-alt',
          route: 'Login'
        }
      ]
    }
  },
  watch: {
    '$route.name'() {
      this.userToggle = false
    }
  },
  computed: {
    ...mapState({
      session: state => state.userAccount.user || null
    })
  }
};
</script>

<style scoped>
.nav-dropdown a {
  cursor: pointer;
}

</style>
