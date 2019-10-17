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
        start: null,
        close: null,
        end: null
      },
      generalInformation: {
        duration: null,
        moduleLabel: '',
        testLabel: ''
      },
      generalStatus: {
        globalProgression: null,
        nbConnected: null,
        nbInTest: null,
        nbFinished: null
      }
    },
    accounts: [{
      id: null,
      type: null,
      firstname: '',
      surname: '',
      status: '',
      questionNo: null,
      startTime: null
    }],
    nbQuestion: '',
    testDuration: null
  }),
  computed: {
    globalProgression: () => {
      return null
    },
    nbConnected: () => {
      return null
    },
    nbInTest: () => {
      return null
    },
    nbFinished: () => {
      return null
    },
    endTime: () => { // Last testaker's ending date
      return null
    }
  },
  mounted () {
    // Retrieve all data here.
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
