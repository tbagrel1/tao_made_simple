<template lang="pug">
  div#tabs
    span#candidates(@click="switchTab(1)")
      Candidates(v-if="currentTab = 1"
        v-for="el in followed" :key="followed.id"
        type="Participant"
        :name="el.name"
        :id="el.id"
        :status="el.status"
        :questionNumber="el.questionNo")
    span#emergency(@click="switchTab(2)")
      Candidates(v-if="currentTab = 2"
        v-for="el in unfollowed" :key="unfollowed.id"
        type="Autres types de compte"
        :name="el.name"
        :id="el.id"
        :status="el.status"
        :questionNumber="el.questionNo")
</template>

<script>
import Candidates from './Candidates.Vue'
export default {
  name: 'Tabs',
  components: {
    Candidates
  },
  props: {
    followed: {
      type: Array[Object],
      required: true
    },
    unfollowed: {
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
    currentTab: 1 // Tab displayed (e.g. 1 : followed accounts tab, 2 : unfollowed accounts tab).
  }),
  mounted () {
  },
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
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
