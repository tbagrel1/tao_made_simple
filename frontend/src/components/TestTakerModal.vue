<template lang="pug">
  b-modal(:id="`test-taker-details-${testTakerId}`" hide-footer :title="`${testTaker.firstname} ${testTaker.lastname}`")
    b-container(fluid)
      b-row
        b-col(cols="12")
          span Avancement : {{ progressionString }}
      b-row
        b-col(cols="12")
          span Temps restant : {{ testTakerRemainingDurationString }}
      b-row
        b-col(cols="12")
          b-btn(@click="$store.commit('changeTab', { testTakerId, tab: newTestTakerTab })")#primary {{ newTestTakerTab === tab.UNSUPERVISED ? 'Ne plus suivre' : 'Suivre' }}
</template>

<script>
import { tab } from '../constants'
export default {
  name: 'Details',
  props: {
    testTakerId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    testTakerRemainingDurationString: 'inconnu',
    tab
  }),
  computed: {
    testTaker () {
      return this.$store.getters.testTaker(this.testTakerId)
    },
    progressionString () {
      return this.$store.getters.progressionString(this.testTakerId)
    },
    newTestTakerTab () {
      if (this.$store.getters.sortedSupervisedTestTakerIds.includes(this.testTakerId)) {
        return tab.UNSUPERVISED
      } else if (this.$store.getters.sortedUnsupervisedTestTakerIds.includes(this.testTakerId)) {
        return tab.SUPERVISED
      } else {
        console.error('NOT IN THIS TAB')
        return ''
      }
    }
  },
  mounted () {
    this.$refreshGetterValue(this, 'testTakerRemainingDurationString', [this.testTakerId])
  }
}
</script>

<style scoped lang="stylus">
</style>
