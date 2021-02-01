import Vue from 'vue'
import Vuex from 'vuex'
import {userAccount} from "@/store/user.module";
import {customer} from "@/store/customer.module";
import {comment} from "@/store/comment.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userAccount,
    customer,
    comment
  }
})
