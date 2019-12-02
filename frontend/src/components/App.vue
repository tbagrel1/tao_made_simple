<template lang="pug">
  div#app
    Header(:header="header", :accounts="accounts", :testDuration="testDuration")
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
    dataReady: false,
    header: {
      time: {
        start: 1575278033,
        close: 1575325033
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
    accounts: [/* {
      id: null,
      type: null,
      firstname: '',
      surname: '',
      status: '',
      questionNo: null,
      startTime: null
    } */],
    nbQuestions: 0,
    testDuration: 3000
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
  created () {
    // Retrieve all data here.
    let A1 = {
      id: 'A1',
      type: 1,
      firstname: 'Amélie',
      surname: 'GEORGE',
      status: 2,
      questionNo: 0,
      startTime: 157410692
    }
    let A2 = {
      id: 'A2',
      type: 1,
      firstname: 'Michel',
      surname: 'POUTOU',
      status: 1,
      questionNo: 0,
      startTime: 157410692
    }
    let A3 = {
      id: 'A3',
      type: 1,
      firstname: 'Dave',
      surname: 'BRUBECK',
      status: 1,
      questionNo: 0,
      startTime: 157410692
    }
    let A4 = {
      id: 'A4',
      type: 1,
      firstname: 'Johnny',
      surname: 'OHLESDOY',
      status: 1,
      questionNo: 0,
      startTime: 157410692
    }
    let A5 = {
      id: 'A5',
      type: 2,
      firstname: 'SEC',
      surname: 'SEC',
      status: 0,
      questionNo: 0,
      startTime: null
    }
    let A6 = {
      id: 'A6',
      type: 1,
      firstname: 'Joan',
      surname: 'LECHAMO',
      status: 0,
      questionNo: 7,
      startTime: 157410592
    }
    let A7 = {
      id: 'A7',
      type: 1,
      firstname: 'Guy',
      surname: 'DUPONT',
      status: 0,
      questionNo: 0,
      startTime: 157410792
    }
    this.accounts.push(A1)
    this.accounts.push(A2)
    this.accounts.push(A3)
    this.accounts.push(A4)
    this.accounts.push(A5)
    this.accounts.push(A6)
    this.accounts.push(A7)
    this.nbQuestions = 15
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
