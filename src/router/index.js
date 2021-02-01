import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Customers from "@/views/Customers";
import CreateCustomer from "@/views/CreateCustomer";
import EditCustomer from "@/views/EditCustomer";
import Comments from "@/views/Comments";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadcrumb: [
        {name: 'Home', routeName: 'Home'}
      ]
    }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
    meta: {
      breadcrumb: [
        {name: 'Home', routeName: 'Home'},
        {name: 'Customers', routeName: 'Customers'},
      ]
    },
  },
  {
    path: '/create-customer',
    name: 'CreateCustomer',
    component: CreateCustomer,
    meta: {
      parent: 'Customers',
      breadcrumb: [
        {name: 'Home', routeName: 'Home'},
        {name: 'Customers', routeName: 'Customers'},
        {name: 'Create Customer', routeName: 'CreateCustomer'},
      ]
    }
  },
  {
    path: '/edit-customer/:id',
    name: 'EditCustomer',
    component: EditCustomer,
    meta: {
      parent: 'Customers',
      breadcrumb: [
        {name: 'Home', routeName: 'Home'},
        {name: 'Customers', routeName: 'Customers'},
        {name: 'Edit Customer', routeName: 'EditCustomer'},
      ]
    }
  },
  {
    path: '/comments',
    name: 'Comments',
    component: Comments,
    meta: {
      breadcrumb: [
        {name: 'Home', routeName: 'Home'},
        {name: 'Comments', routeName: 'Comments'},
      ]
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
