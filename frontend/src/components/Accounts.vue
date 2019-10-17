<template lang="pug">
  div#accounts
    Tabs
</template>

<script>
import Tabs from './Tabs.Vue'
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
  computed: {
  },
  mounted () {
    // Divide accounts into candidates and emergency accounts.
    // Then pass them to the Tabs component as an object.
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
