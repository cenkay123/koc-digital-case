<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Update Customer</div>
          <div class="card-body">
            <form class="needs-validation" @submit.prevent="updateCustomer" v-if="customer">
              <div class="form-row">
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customer.name) }">
                  <label>Name*</label>
                  <input type="text" class="form-control form-control-warning" placeholder="Name"
                         v-model="customer.name"
                         :class="{ 'is-invalid': attemptSubmit && requiredField(customer.name) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customer.name)">
                    Please enter a name.
                  </div>
                </div>
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customer.surname) }">
                  <label>Surname*</label>
                  <input type="text" class="form-control" placeholder="Surname" v-model="customer.surname"
                         :class="{ 'is-invalid': attemptSubmit && requiredField(customer.surname) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customer.surname)">
                    Please enter a surname.
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12"
                     :class="{ 'has-danger': attemptSubmit && isEmailValid(customer.email) }">
                  <label>Email Address*</label>
                  <input type="email" class="form-control" placeholder="Email Address" v-model="customer.email"
                         :class="{ 'is-invalid': attemptSubmit && isEmailValid(customer.email) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && isEmailValid(customer.email)">
                    Please enter a valid email address.
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customer.company) }">
                  <label>Company*</label>
                  <input type="text" class="form-control" placeholder="Company" v-model="customer.company"
                         :class="{ 'is-invalid': attemptSubmit && requiredField(customer.company) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customer.company)">
                    Please enter a company.
                  </div>
                </div>
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customer.department) }">
                  <label>Department</label>
                  <select class="form-control" v-model="customer.department"
                          :class="{ 'is-invalid': attemptSubmit && requiredField(customer.department) }">
                    <option :value="null" selected>Choose...</option>
                    <option v-for="(department, idx) in departments" :key="idx" :value="department">
                      {{ department.name }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customer.department)">
                    Please enter a valid department.
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary" @click="updateCustomer">
                <i class="fas fa-save"></i> Update
              </button>
            </form>
            <EmptyDataAlert text="Kullanici Bulunamadi." type="danger" v-else></EmptyDataAlert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import EmptyDataAlert from "@/components/EmptyDataAlert";

export default {
  name: "EditCustomer",
  components: {EmptyDataAlert},
  data() {
    return {
      departments: [
        {id: 1, name: 'Fullstack Developer'},
        {id: 2, name: 'Frontend Developer'},
        {id: 3, name: 'Backend Developer'},
        {id: 4, name: 'Devops'}
      ],
      attemptSubmit: false,
    }
  },
  mounted() {
    this.getDetailCustomer(this.$route.params.id)
  },
  computed: {
    ...mapState({
      customer: state => state.customer.singleCustomer || null
    }),
  },
  methods: {
    ...mapActions('customer', {
      getDetailCustomer: 'detail',
      editCustomer: 'update'
    }),
    updateCustomer() {
      this.attemptSubmit = true;
      if (this.customer.name && this.customer.surname && !this.isEmailValid(this.customer.email) && this.customer.company && this.customer.department) {
        this.editCustomer(this.customer)
      }
    },
  }
}
</script>

<style scoped>

</style>
