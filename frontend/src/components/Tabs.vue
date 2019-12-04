<template lang="pug">
  b-container(fluid)#tabs
    b-row
      b-col(cols="12")
        b-tabs#test-takers
          b-tab(title="Candidats suivis" active)
            b-container#supervised-test-takers
              b-row
                TestTaker(
                  v-for="id in supervisedTestTakerIds" :key="id"
                  :testTakerId="id"
                )
          b-tab(title="Candidats non suivis")
            b-container#unsupervised-test-takers
              b-row
                TestTaker(
                  v-for="id in unsupervisedTestTakerIds" :key="id"
                  :testTakerId="id"
                )
</template>

<script>
import TestTaker from './TestTaker'

export default {
  name: 'Tabs',
  components: {
    TestTaker
  },
  computed: {
    supervisedTestTakerIds () {
      return this.$store.getters.sortedSupervisedTestTakerIds
    },
    unsupervisedTestTakerIds () {
      return this.$store.getters.sortedUnsupervisedTestTakerIds
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
