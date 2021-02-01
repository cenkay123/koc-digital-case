<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <BreadcrumbLink v-for="(breadcrumbLink, idx) in $route.meta.breadcrumb" :key="idx"
                      :breadcrumbLink="breadcrumbLink"></BreadcrumbLink>
    </ol>
  </nav>
</template>

<script>
import BreadcrumbLink from "@/components/breadcrumbComponents/breadcrumbLink";

export default {
  name: "Breadcrumb",
  components: {BreadcrumbLink},
}
</script>

<style scoped>
</style>
