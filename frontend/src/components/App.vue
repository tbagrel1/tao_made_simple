<template lang="pug">
  div#app
    nav.navbar.navbar-dark.bg-dark
      span.navbar-brand TAO Made Simple
      span.navbar-text Additional interfaces for the TAO system
    b-container#app-actions(fluid align-v="center")
      b-row#app-row(align-h="center")
        b-col#app-col(xs="12" sm="11" md="10" lg="9" xl="8")
          h1 Welcome on TAO Made Simple !
          h2 Users
            ul
              li(v-for="user in users" :key="user.id") {{ user.username }}
          h2 Posts
            ul
              li(v-for="post in posts" :key="post.id") {{ post.title }} ({{ post.author }})
    Test
</template>

<script>
import Test from './Test'
export default {
  name: 'App',
  components: {
    Test
  },
  data: () => ({
    users: [{
      id: -1,
      username: '... loading ...',
      email: ''
    }],
    posts: [{
      id: -1,
      title: '... loading ...',
      content: '',
      author_id: -1
    }]
  }),
  mounted () {
    this.$axios.get('http://localhost:10080/api/user')
      .then(response => {
        this.$jsonLog(response)
        this.users = response.data
      })
    this.$axios.get('http://localhost:10080/api/post')
      .then(response => {
        this.$jsonLog(response)
        this.posts = response.data
      })
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
  #app
    height 100%
    display flex
    flex-direction column
    align-content center
    justify-content start
  #app-actions
    flex-grow 1
    display flex
    flex-direction column
    align-content center
    justify-content center
</style>
