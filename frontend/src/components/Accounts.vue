<template lang="pug">
  div#accounts
    Tabs(:followed="followed", :unfollowed="unfollowed", :nbQuestions="nbQuestions", :testDuration="testDuration")
</template>

<script>
// Note : use dependency injection instead of props  : https://vuejs.org/v2/guide/components-edge-cases.html
import Tabs from './Tabs'
export default {
  name: 'Accounts',
  components: {
    Tabs
  },
  props: {
    accounts: {
      type: Array[Object],
      default: [{
        id: null,
        type: null,
        firstname: '',
        surname: '',
        status: null,
        questionNo: null,
        startTime: null
      }],
      required: true
    },
    nbQuestions: {
      type: Number,
      required: false
    },
    testDuration: {
      type: Date,
      required: false
    }
  },
  computed: {
    // Divide accounts into candidates and emergency accounts.
    // Then pass them to the Tabs component as an object.
    followed () {
      return this.accounts.filter(el => el.type === 1)
    },
    unfollowed () {
      return this.accounts.filter(el => el.type === 2)
    }
    // console.log(this.accounts)
    // this.accounts.forEach((el) => {
    //   console.log(el)
    //   if (el.type === 2) {
    //     this.unfollowed.push(el)
    //   } else {
    //     this.followed.push(el)
    //   }
    // })
  }
}
</script>

<style scoped lang="stylus">
</style>
