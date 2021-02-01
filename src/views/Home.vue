<template>
  <div class="container-fluid">
    <PageHeader pageName="Dashboard"></PageHeader>
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-3 mt-3">
        <DetailCard title="Customers" icon="fas fa-users" :count="customers.length">
          <template #pushLink>
            <router-link :to="{name: 'Customers'}" tag="div" class="stats pointer">
              <i class="fas fas fa-users"></i> Show All
            </router-link>
          </template>
        </DetailCard>
      </div>
    </div>
  </div>
</template>

<script>

import PageHeader from "@/components/PageHeader";
import DetailCard from "@/components/DetailCard";
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {DetailCard, PageHeader},
  mounted() {
    this.getAllCustomers()
  },
  computed: {
    ...mapState({
      customers: state => state.customer.customers || [],
    }),
  },
  methods: {
    ...mapActions('customer', {
      getAllCustomers: 'all',
    }),
  }
}
</script>
