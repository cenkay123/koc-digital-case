<template>
  <div class="container-fluid">
    <PageHeader pageName="Customers"></PageHeader>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <CustomTable :headers="headers" :items="items" :tableOptions="tableOptions">
          <template #actionsTitle>Actions</template>
          <template #topButtons>
            <router-link :to="{name: 'CreateCustomer'}">
              <div class="btn btn-info">
                <i class="fas fa-plus-square pr-2"></i>Create Customer
              </div>
            </router-link>
          </template>
          <template #actions="{data}">
            <div class="d-flex justify-content-around float-right" style="width: 170px">
              <router-link :to="{name: 'EditCustomer', params: {id: data.id}}" tag="div" class="btn btn-sm btn-primary">
                <i class="fas fa-edit pr-1"></i>Edit
              </router-link>
              <div class="btn btn-sm btn-danger" @click="deleteCustomer(data)">
                <i class="fas fa-minus-circle pr-1"></i>Delete
              </div>
            </div>
          </template>
        </CustomTable>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTable from "@/components/CustomTable";
import PageHeader from "@/components/PageHeader";
import {mapState, mapActions} from 'vuex'

export default {
  name: "Customers",
  components: {PageHeader, CustomTable},
  data() {
    return {
      headers: [
        {text: '#', key: 'id', sortable: true, capitalize: false},
        {text: 'Name Surname', key: 'fullname', sortable: false, capitalize: true},
        {text: 'Email', key: 'email', sortable: false, capitalize: false},
        {text: 'Company', key: 'company', sortable: false, capitalize: true},
        {text: 'Department', key: 'departmentName', sortable: false, capitalize: true}
      ],
      tableOptions: {
        actions: true,
        tableTitle: 'Customers'
      }
    }
  },
  mounted() {
    this.getAllCustomers();
  },
  computed: {
    ...mapState({
      items: state => state.customer.customers || [],
    }),
  },
  methods: {
    ...mapActions('customer', {
      getAllCustomers: 'all',
      delete: 'delete'
    }),
    deleteCustomer(customer) {
      this.$swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete the client?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(customer.id);
          this.getAllCustomers()
        } else if (result.isDenied) {
          this.$swal.fire('Deletion aborted', '', 'info')
        }
      })
    },
  }
}
</script>

<style scoped>
</style>
