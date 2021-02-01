import {EventBus} from "@/main";
import {commentService} from "@/services/comment.service";

const state = {
  comments: [],
}

const actions = {
  // all comments
  all({commit}, limit) {
    EventBus.$emit('loading', true);
    commentService.fetchComments(limit)
      .then((response) => {
        commit('getAllSuccess', response)
      });
  },
}

const mutations = {
  getAllSuccess(state, comments) {
    state.comments = comments;
    EventBus.$emit('loading', false);
    if(comments.length > 12) {
      setTimeout(() => {
        var container = document.getElementById("app");
        container.scrollIntoView({behavior: "smooth", block: "end"});
      }, 100)
    }
  },
}

export const comment = {
  namespaced: true,
  state,
  actions,
  mutations
};
