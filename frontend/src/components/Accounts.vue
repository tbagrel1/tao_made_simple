<template lang="pug">
  div#accounts
    Tabs
</template>

<script>
import Tabs from './Tabs.Vue'
export default {
  name: 'Accounts',
  components: {
      Tabs,
  },
  data: () => ({

  }),
  mounted () {
      // Divide accounts into candidates and emergency accounts.
      // Then pass them to the Tabs component as an object.
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
