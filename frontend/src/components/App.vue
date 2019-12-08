<template lang="pug">
  div#app
    b-navbar
      b-navbar-brand
        h1 TAO Made Simple
    Header
    Tabs
</template>

<script>
import Header from './Header'
import Tabs from './Tabs'
export default {
  name: 'App',
  components: {
    Header,
    Tabs
  }
}
</script>

<style scoped lang="stylus">
</style>
