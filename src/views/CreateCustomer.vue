<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Create Customer</div>
          <div class="card-body">
            <form class="needs-validation" @submit.prevent="createCustomer">
              <div class="form-row">
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customerForm.name) }">
                  <label>Name*</label>
                  <input type="text" class="form-control form-control-warning" placeholder="Name"
                         v-model="customerForm.name"
                         :class="{ 'is-invalid': attemptSubmit && requiredField(customerForm.name) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customerForm.name)">
                    Please enter a name.
                  </div>
                </div>
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customerForm.surname) }">
                  <label>Surname*</label>
                  <input type="text" class="form-control" placeholder="Surname" v-model="customerForm.surname"
                         :class="{ 'is-invalid': attemptSubmit && requiredField(customerForm.surname) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customerForm.surname)">
                    Please enter a surname.
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12"
                     :class="{ 'has-danger': attemptSubmit && isEmailValid(customerForm.email) }">
                  <label>Email Address*</label>
                  <input type="email" class="form-control" placeholder="Email Address" v-model="customerForm.email"
                         :class="{ 'is-invalid': attemptSubmit && isEmailValid(customerForm.email) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && isEmailValid(customerForm.email)">
                    Please enter a valid email address.
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customerForm.company) }">
                  <label>Company*</label>
                  <input type="text" class="form-control" placeholder="Company" v-model="customerForm.company"
                         :class="{ 'is-invalid': attemptSubmit && requiredField(customerForm.company) }">
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customerForm.company)">
                    Please enter a company.
                  </div>
                </div>
                <div class="form-group col-md-6"
                     :class="{ 'has-danger': attemptSubmit && requiredField(customerForm.department) }">
                  <label>Department</label>
                  <select class="form-control" v-model="customerForm.department"
                          :class="{ 'is-invalid': attemptSubmit && requiredField(customerForm.department) }">
                    <option :value="null" selected>Choose...</option>
                    <option v-for="(department, idx) in departments" :key="idx" :value="department">
                      {{ department.name }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-show="attemptSubmit && requiredField(customerForm.department)">
                    Please enter a valid department.
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary" @click="createCustomer">
                <i class="fas fa-save"></i> Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "CreateCustomer",
  data() {
    return {
      customerForm: {
        name: '',
        surname: '',
        email: '',
        company: '',
        department: null,
      },
      departments: [
        {id: 1, name: 'Fullstack Developer'},
        {id: 2, name: 'Frontend Developer'},
        {id: 3, name: 'Backend Developer'},
        {id: 4, name: 'Devops'}
      ],
      attemptSubmit: false,
    }
  },
  methods: {
    ...mapActions('customer', ['create']),
    createCustomer() {
      this.attemptSubmit = true;
      if (this.customerForm.name && this.customerForm.surname && !this.isEmailValid(this.customerForm.email) && this.customerForm.company && this.customerForm.department) {
        this.create(this.customerForm)
      }
    },
  }
}
</script>

<style scoped>

</style>
