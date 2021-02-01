import {customerService} from "@/services/customer.service";
import {EventBus} from "@/main";
import router from "@/router";
import Vue from 'vue'

const state = {
  customers: [],
  singleCustomer: null
}

const actions = {
  // customer create
  create({commit}, customer) {
    EventBus.$emit('loading', true);
    customer.department = customer.department.id;
    customerService.createCustomer(customer)
      .then((response) => {
        commit('pushCustomers', response);
      });
  },
  // customer update
  update({commit}, customer) {
    customerService.customerUpdate(customer)
      .then((response) => {
        commit('pushCustomers', response)
      })
  },
  // customer delete
  delete({commit}, customerId) {
    customerService.deleteCustomer(customerId)
      .then((response) => {
          commit('deleteCustomer', response)
        }
      )
  },
  // customer detail
  detail({commit}, customerId) {
    EventBus.$emit('loading', true);
    customerService.getCustomer(customerId)
      .then((response) => {
        commit('getSingleCustomerSuccess', response.text);
      });
  },

  // all customers
  all({commit}) {
    EventBus.$emit('loading', true);
    customerService.fetchCustomers()
      .then((customers) => {
        commit('getAllSuccess', customers.text)
      });
  },
}

const mutations = {
  getAllSuccess(state, customers) {
    const customCustomers = [];
    customers.forEach((c) => {
      c.departmentName = c.department?.name ?? c.department;
      c.fullname = c.name + ' ' + c.surname;
      customCustomers.push(c)
    })
    state.customers = customCustomers;
    EventBus.$emit('loading', false);
  },
  getSingleCustomerSuccess(state, customer) {
    state.singleCustomer = customer
    EventBus.$emit('loading', false);
  },
  pushCustomers(state, response) {
    EventBus.$emit('loading', false);
    Vue.swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.text,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      router.push({name: 'Customers'});
    })
  },
  deleteCustomer(state, response) {
    Vue.swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.text,
      showConfirmButton: false,
      timer: 1500
    })
  }
}

export const customer = {
  namespaced: true,
  state,
  actions,
  mutations
};
