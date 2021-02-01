const users = [
  {
    id: 1,
    username: 'admin',
    firstname: 'Koc',
    lastname: 'Digital',
    password: 'admin'
  }
];

const departments = [
  {id: 1, name: 'Fullstack Developer'},
  {id: 2, name: 'Frontend Developer'},
  {id: 3, name: 'Backend Developer'},
  {id: 4, name: 'Devops'}
];

const customers = JSON.parse(localStorage.getItem('customers')) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        // login user
        if (url === `${window.location.origin}/auth` && opts.method === 'POST') {
          let params = JSON.parse(opts.body);
          let filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password;
          });
          if (filteredUsers.length) {
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token'
            };
            resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
          } else {
            reject({ok: false, text: 'User not found!', status: 403});
          }
          return;
        }

        // all customers
        if (url === `${window.location.origin}/customers` && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({ok: true, status: 200, text: customers});
          } else {
            reject({ok: false, status: 401, text: 'Unauthorised'});
          }
          return;
        }

        // detail customer
        if (url === `${window.location.origin}/customer` && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            let id = JSON.parse(opts.body).id;
            let matchedCustomers = customers.filter(customer => {
              return customer.id == id;
            });
            let customer = matchedCustomers.length ? matchedCustomers[0] : null;
            resolve({ok: true, status: 200, text: customer});
          } else {
            reject({ok: false, status: 401, text: 'Unauthorised'});
          }
          return;
        }

        // update customer
        if (url === `${window.location.origin}/customer/update` && opts.method === 'POST') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            let id = JSON.parse(opts.body).id;
            let customer = JSON.parse(opts.body).customer;
            let matchCustomerIndex = customers.findIndex(c => c.id == id);
            customers[matchCustomerIndex] = customer;
            localStorage.setItem('customers', JSON.stringify(customers));
            resolve({ok: true, status: 200, text: 'Customer updated successfully'});
          } else {
            reject({ok: false, status: 401, text: 'Unauthorised'});
          }
          return;
        }

        // delete customer
        if (url === `${window.location.origin}/customer/delete` && opts.method === 'POST') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            let id = JSON.parse(opts.body).id;
            let customerIndex = customers.findIndex(c => c.id == id);
            customers.splice(customerIndex, 1);
            localStorage.setItem('customers', JSON.stringify(customers));
            resolve({ok: true, status: 200, text: 'Customer deleted successfully'});
          } else {
            reject({ok: false, status: 401, text: 'Unauthorised'});
          }
          return;
        }

        // new customer
        if (url === `${window.location.origin}/customer/create` && opts.method === 'POST') {
          const newCustomer = JSON.parse(opts.body);
          if (newCustomer.name && newCustomer.surname && newCustomer.email && newCustomer.company && newCustomer.department) {
            newCustomer.id = customers.length ? Math.max(...customers.map(customer => customer.id)) + 1 : 1;
            newCustomer.department = departments.find(d => d.id === newCustomer.department)
            customers.push(newCustomer);
            localStorage.setItem('customers', JSON.stringify(customers));
            resolve({ok: true, text: 'Added with customer success', status: 200});
          } else {
            reject({ok: false, text: "Required invalid field{s}", status: 400});
          }
          return;
        }
        realFetch(url, opts).then(response => resolve(response.json()));
      }, 500);
    });
  }
}
