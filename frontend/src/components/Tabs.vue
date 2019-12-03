<template lang="pug">
  div#tabs
    b-button-group#buttons
      button#candidates(@click="switchTab($tab.SUPERVISED)" :class="(currentTab === $tab.SUPERVISED ? 'btn-primary' : 'btn-outline-primary') + ' btn btn-lg'") Candidats suivis
      button#emergency(@click="switchTab($tab.UNSUPERVISED)" :class="(currentTab === $tab.UNSUPERVISED ? 'btn-primary' : 'btn-outline-primary') + ' btn btn-lg'") Candidats non suivis
    b-row#accounts-list()
      TestTaker(v-if="currentTab === $tab.SUPERVISED"
        v-for="id in supervisedTestTakerIds" :key="id"
        :id="id"
      )
      TestTaker(v-if="currentTab === 2"
        v-for="id in unsupervisedTestTakerIds" :key="id"
        :id="id"
      )
</template>

<script>
import TestTaker from './TestTaker'
export default {
  name: 'Tabs',
  components: {
    TestTaker
  },
  data: () => ({
    currentTab: this.$tab.SUPERVISED
  }),
  computed: {
    supervisedTestTakerIds () {
      return this.$store.getters.supervisedTestTakerIds
    },
    unsupervisedTestTakerIds () {
      return this.$store.getters.unsupervisedTestTakerIds
    }
  },
  methods: {
    switchTab (tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
