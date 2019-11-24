<template lang="pug">
  div#app
    Accounts(:accounts="accounts", :nbQuestions="nbQuestions", :testDuration="testDuration")
</template>

<script>
import Header from './Header'
import Accounts from './Accounts'
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
    nbQuestions: 0,
    testDuration: new Date()
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
    this.accounts = [{
      id: 'A1',
      type: 1,
      firstname: 'Amélie',
      surname: 'GEORGE',
      status: '',
      questionNo: 0,
      startTime: null
    }, {
      id: 'A2',
      type: 1,
      firstname: 'Michel',
      surname: 'POUTOU',
      status: '',
      questionNo: 0,
      startTime: null
    }, {
      id: 'A3',
      type: 1,
      firstname: 'Dave',
      surname: 'BRUBECK',
      status: '',
      questionNo: 0,
      startTime: null
    }, {
      id: 'A4',
      type: 1,
      firstname: 'Johnny',
      surname: 'OHLESDOY',
      status: '',
      questionNo: 0,
      startTime: null
    }, {
      id: 'A5',
      type: 2,
      firstname: 'SEC',
      surname: 'SEC',
      status: '',
      questionNo: 0,
      startTime: null
    }, {
      id: 'A6',
      type: 1,
      firstname: 'Joan',
      surname: 'LECHAMO',
      status: '',
      questionNo: 0,
      startTime: null
    }, {
      id: 'A7',
      type: 1,
      firstname: 'Guy',
      surname: 'DUPONT',
      status: '',
      questionNo: 0,
      startTime: null
    }]
    this.nbQuestions = 15
  }
}
</script>

<style scoped lang="stylus">
</style>
