import {authHeader} from "@/helpers/authHeader";

export const customerService = {
  createCustomer,
  customerUpdate,
  fetchCustomers,
  getCustomer,
  deleteCustomer
};

function createCustomer(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${window.location.origin}/customer/create`, requestOptions)
    .then(handleResponse)
}

function customerUpdate(customer) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({customer: customer, id: customer.id})
  };

  return fetch(`${window.location.origin}/customer/update`, requestOptions)
    .then(handleResponse)
}

function deleteCustomer(id) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({id: id})
  }

  return fetch(`${window.location.origin}/customer/delete`, requestOptions)
    .then(handleResponse)
}

async function fetchCustomers() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return await fetch(`${window.location.origin}/customers`, requestOptions)
    .then(handleResponse)
}

async function getCustomer(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    body: JSON.stringify({id: id})
  };
  return await fetch(`${window.location.origin}/customer`, requestOptions)
    .then(handleResponse)
}

function handleResponse(response) {
  if(!response.ok) {
    return Promise.reject(response)
  }
  return response || JSON.parse(response);
}
