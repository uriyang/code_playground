import SearchModel from './models/SearchModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    searchResult: []
  },
  methods: {
    onSubmit(e) {
      this.search()
    },
    onKeyup() {
      !this.query.length ? this.onReset() : null
    },
    onReset() {
      this.query = ''
      // todo 검색결과를 숨김
      debugger
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true
        this.searchResult = data
      })
    },
    resetForm() {
      this.query = ''
      // todo remove results
      debugger
    }
  }
})