<template lang="pug">
  div#tabs
    span#candidates(@click="switchTab(1)")
      Candidates(v-if="currentTab = 1"
        v-for="can in candidates" :key="candidates.id"
        type="Candidat"
        :name="can.name"
        :id="can.id"
        :status="can.status"
        :questionNumber="can.questionNumber")
    span#emergency(@click="switchTab(2)")
      Candidates(v-if="currentTab = 2"
        v-for="eme in emergencyAccounts" :key="emergencyAccounts.id"
        type="Compte de secours"
        :name="eme.name"
        :id="eme.id"
        :status="eme.status"
        :questionNumber="eme.questionNumber")
</template>

<script>
import Candidates from './Candidates.Vue'
export default {
  name: 'Tabs',
  components: {
    Candidates
  },
  props: {
    candidates: Object,
    /* {
          name: Array,
          id: Array,
          status: Array,
          questionNumber: Array,
      } */
    emergencyAccounts: Object,
    numberOfQuestions: Number
  },
  data: () => ({
    currentTab: 1 // Tab displayed (e.g. 1 : candidates tab, 2 : emergency accounts tab).
  }),
  mounted () {
  },
  methods: {
    switchTab (tabNumber) {
      this.currentTab = tabNumber
    },
    candidateToEmergency (id) {
      // Important : don't use 'array[i] = a' because Vue JS don't update with that kind of assignation.
      // Prefer things like 'array.push', 'array.split' or 'Vue.set(object)' instead.
      // See https://vuejs.org/v2/guide/reactivity.html for more details.
      let ca = this.candidates
      this.candidates.split()
      this.emergencyAccounts.push()
    },
    emergencyToCandidate (id) {
      let ca = this.emergencyAccounts
      this.emergencyAccounts.split()
      this.candidates.push()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
