<template>
  <div class="container-fluid">
    <PageHeader pageName="Comments"></PageHeader>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="(comment, idx) in comments" :key="idx">
        <CommentCard :comment="comment"></CommentCard>
      </div>
    </div>
    <div class="row">
      <div class="d-flex justify-content-center w-100">
        <div class="btn btn-info" @click="loadMore">Show More <i class="fas fa-arrow-down pl-2"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import CommentCard from "@/components/commentsComponents/CommentCard";
import PageHeader from "@/components/PageHeader";

export default {
  name: "Comments",
  components: {PageHeader, CommentCard},
  data() {
    return {
      limit: 12
    }
  },
  mounted() {
    this.getAllComments(this.limit);
  },
  computed: {
    ...mapState({
      comments: state => state.comment.comments || [],
    }),
  },
  methods: {
    ...mapActions('comment', {
      getAllComments: 'all',
    }),
    loadMore() {
      this.limit += 12;
      this.getAllComments(this.limit);
    }
  }
}
</script>

<style scoped>

</style>
