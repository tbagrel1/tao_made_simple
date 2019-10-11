<template lang="pug">
  div#app
    Header
    Accounts
</template>

<script>
import Header from './Header.Vue'
import Accounts from './Accounts.Vue'
export default {
  name: 'App',
  components: {
    Header,
    Accounts
  },
  data: () => ({
    header: {
      time: {
        startTime: null,
        endFirstTime: null,
        endTime: null
      },
      generalInformation: {
        moduleName: '',
        testName: ''
      }
    },
    accounts: {

    }
  }),
  mounted () {
    // Retrieve all data here.
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
