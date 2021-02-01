<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5>{{ tableOptions.tableTitle }}</h5>
      <div class="d-flex">
        <slot name="topButtons"></slot>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-end">
        <div class="input-group mb-3 col-sm-12 col-md-3" v-if="selectedSearchHeader">
          <div class="input-group-prepend">
            <button class="btn btn-sm btn-secondary dropdown-toggle" type="button"
                    @click="searchToggle = !searchToggle">
              {{ selectedSearchHeader.text }}
            </button>
            <div class="dropdown-menu" :class="{show: searchToggle}">
              <a class="dropdown-item pointer" v-for="(header, idx) in headers" :key="idx"
                 @click="selectedSearch(header)">{{ header.text }}</a>
            </div>
          </div>
          <input type="text" class="form-control" aria-label="Default" v-model="search"
                 aria-describedby="inputGroup-sizing-default"
                 :placeholder="`search ${selectedSearchHeader.text.toLowerCase()}`">
        </div>
      </div>
      <table class="table table-hover table-bordered mb-0" v-if="items.length && windowWidth > 650">
        <thead class="bg-lighter-grey">
        <tr>
          <th v-for="(header, idx) in headers" :key="idx" :class="{ sorted: sort === header.key }"
              @click="sortBy(header.key, header.sortable)" scope="col">
            {{ header.text }}
            <span class="fa-pull-right" v-if="header.sortable">
                    <i class="fas fa-sort-amount-down" :class="sort === header.key ? 'text-primary' : ''"></i>
                  </span>
          </th>
          <th v-if="tableOptions.actions" scope="col" width="250">
            <slot name="actionsTitle"></slot>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, idx) in searchStatus ? searchedItems : sortedItems" :key="idx">
          <td v-for="(n, idx) in headers" :key="idx" colspan="1">
            <span v-if="n.capitalize">{{ item[n.key] | capitalize }}</span>
            <span v-else>{{ item[n.key] }}</span>
          </td>
          <td v-if="tableOptions.actions" colspan="1">
            <slot name="actions" :data="item"></slot>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else-if="windowWidth < 650" class="mobileTable">
        <div class="mobile-table-item">
          <ul class="list-group" v-for="(item, idx) in searchedItems" :key="idx">
            <li class="list-group-item d-flex justify-content-between position-relative overflow-hidden align-items-center"
                v-for="(n, idx) in headers" :key="idx">
              <span class="text-black-50 list-title" style="font-size: 12px">{{ n.text }}:</span>
              <span class="list-item">{{ item[n.key] }}</span>
            </li>
            <li class="list-group-item" v-if="tableOptions.actions">
              <span class="text-black-50" style="font-size: 12px">Actions:</span>
              <slot name="actions" :data="item"></slot>
            </li>
          </ul>
        </div>
      </div>
      <EmptyDataAlert text="Customer list not found. Please add a customer." type="warning"
                      v-if="!items.length"></EmptyDataAlert>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-end">
      <select class="form-control w-25" v-model="pageSizeModel">
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
      <div class="controls ml-2">
        <button class="btn btn-sm btn-primary" :disabled="!hasPage(-1)" @click="prevPage">←</button>
        <button class="btn btn-sm btn-primary ml-1" :disabled="!hasPage(1)" @click="nextPage">→</button>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyDataAlert from "@/components/EmptyDataAlert";

export default {
  name: "CustomTable",
  components: {EmptyDataAlert},
  props: {
    headers: Array,
    items: Array,
    tableOptions: Object
  },
  data() {
    return {
      search: '',
      searchStatus: false,
      sort: '',
      sortDir: 'asc',
      page: 0,
      pageSize: 25,
      selectedSearchHeader: null,
      searchToggle: false
    }
  },
  mounted() {
    this.sort = this.headers[0].key;
    this.selectedSearchHeader = this.headers[1]
  },
  watch: {
    'search'() {
      if (this.search) {
        this.searchStatus = true
      }
    },
    'pageSizeModel'() {
      this.searchStatus = false
    }
  },
  filters: {
    capitalize: function (v) {
      if (!v) return ''
      v = v.toString()
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  },
  computed: {
    sortedItems: function () {
      var th = this;
      return th.items.sort((a, b) => {
        let dir = (this.sortDir === 'asc') ? 1 : -1;
        if (a[this.sort] < b[this.sort]) {
          return -1 * dir;
        } else if (a[this.sort] > b[this.sort]) {
          return 1 * dir;
        } else {
          return 0;
        }
      }).filter((row, idx) => {
        let s = this.page * this.pageSize;
        let e = (this.page + 1) * this.pageSize;
        return (idx >= s && idx < e);
      })
    },
    pageSizeModel: {
      get() {
        return this.pageSize;
      },
      set(v) {
        this.pageSize = v;
        this.page = 0;
      }
    },
    searchedItems() {
      return this.selectedSearchHeader ?  this.items.filter(item => {
        return item[this.selectedSearchHeader.key].toLowerCase().includes(this.search.toLowerCase())
      }) : []
    }
  },
  methods: {
    sortBy: function (s, status) {
      this.searchStatus = false
      if (status) {
        if (s === this.sort) {
          this.sortDir = (this.sortDir === 'asc') ? 'desc' : 'asc';
        } else {
          this.sortDir = 'asc';
        }
        this.sort = s;
      }
    },
    hasPage: function (dir) {
      if (dir === -1 && (this.page > 0)) return true;
      if (dir === 1 && (((this.page + 1) * this.pageSize) < this.items.length)) return true;
      return false;
    },
    prevPage: function () {
      if (this.hasPage(-1)) this.page--;
    },
    nextPage: function () {
      if (this.hasPage(1)) this.page++;
    },
    selectedSearch(item) {
      this.selectedSearchHeader = item;
      this.searchToggle = false
    }
  }
}
</script>

<style scoped>
table td {
  padding-top: .35rem !important;
  padding-bottom: .35rem !important;
}

.list-title {
  font-size: 12px;
}

.list-item {
  max-width: 200px;
  text-align: right;
}
</style>
