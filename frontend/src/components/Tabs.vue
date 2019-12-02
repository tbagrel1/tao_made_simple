<template lang="pug">
  div#tabs
    b-button-group#buttons
      button#candidates(@click="switchTab(1)" :class="(currentTab === 1 ? 'btn-primary' : 'btn-outline-primary') + ' btn btn-lg'") Participants
      button#emergency(@click="switchTab(2)" :class="(currentTab === 2 ? 'btn-primary' : 'btn-outline-primary') + ' btn btn-lg'") Autres types de comptes
    b-row#accounts-list()
      Candidates(v-if="currentTab === 1"
        v-for="el in followed" :key="followed.id"
        :id="el.id"
        type="Participant"
        :firstname="el.firstname"
        :surname="el.surname"
        :status="el.status"
        :questionNo="el.questionNo"
        :nbQuestions="nbQuestions"
        :startTime="el.startTime"
        :testDuration="testDuration")
      Candidates(v-if="currentTab === 2"
        v-for="el in unfollowed" :key="unfollowed.id"
        :id="el.id"
        type="Autres types de compte"
        :firstname="el.firstname"
        :surname="el.surname"
        :status="el.status"
        :questionNo="el.questionNo"
        :nbQuestions="el.nbQuestions"
        :startTime="el.startTime"
        :testDuration="el.testDuration")
</template>

<script>
import Candidates from './Candidates'
export default {
  name: 'Tabs',
  components: {
    Candidates
  },
  props: {
    nbQuestions: {
      type: Number,
      required: false
    },
    testDuration: {
      type: Date,
      required: false
    },
    accounts: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentTab: 1 // Tab displayed (e.g. 1 : followed accounts tab, 2 : unfollowed accounts tab).
  }),
  methods: {
    switchTab (tabNumber) {
      this.currentTab = tabNumber
    },
    arrayToArray (id, source, destination) {
      // Important : don't use 'array[i] = a' because Vue JS don't update with that kind of assignation.
      // Prefer things like 'array.push', 'array.split' or 'Vue.set(object)' instead.
      // See https://vuejs.org/v2/guide/reactivity.html for more details.
      let index = source.findIndex(x => x.id === id)
      let el = source[index]
      source.splice(index, 1, source[index])
      destination.push(el)
    },
    changeAccountType (id, type) {
      console.log('TEST')
      if (type === 'Participant') {
        console.log('PARTICIPANT')
        this.arrayToArray(id, this.followed, this.unfollowed)
      }

      if (type === 'Autres types de compte') {
        console.log('AUTRE')
        this.arrayToArray(id, this.unfollowed, this.followed)
      }
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
  }
}
</script>

<style scoped lang="stylus">
</style>
