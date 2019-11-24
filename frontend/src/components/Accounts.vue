<template lang="pug">
  div#accounts
    Tabs(:followed="followed", :unfollowed="unfollowed", :nbQuestions="nbQuestions", :testDuration="testDuration")
</template>

<script>
import Tabs from './Tabs'
export default {
  name: 'Accounts',
  components: {
    Tabs
  },
  props: {
    accounts: {
      type: Array[Object],
      required: true
    },
    nbQuestions: {
      type: Number,
      required: true
    },
    testDuration: {
      type: Date,
      required: true
    }
  },
  data: () => ({
    followed: [{}],
    unfollowed: [{}]
  }),
  mounted () {
    // Divide accounts into candidates and emergency accounts.
    // Then pass them to the Tabs component as an object.
    /* this.accounts.forEach((el) => {
      console.log(el)
      if (el.type === 2) {
        this.unfollowed.push(el)
      } else {
        this.followed.push(el)
      }
    }) */
    this.followed = this.accounts
  }
}
</script>

<style scoped lang="stylus">
</style>
