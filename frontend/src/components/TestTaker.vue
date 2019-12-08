<template lang="pug">
  div(@click="$bvModal.show(`test-taker-details-${testTakerId}`)").test-taker
    div.test-taker-header
      h3 {{ testTaker.firstname }} {{ testTaker.lastname }}
    div.test-taker-status
      b-alert(:variant="statusColor" show) Statut : {{ fancyStatus }}
    div.test-taker-progress
      b-progress(:value="fancyTestQuestionNo" :max="delivery.testNbQuestion")
    TestTakerModal(:testTakerId="testTakerId")
</template>

<script>
import TestTakerModal from './TestTakerModal'
import { status } from '@/constants'

export default {
  name: 'TestTaker',
  components: {
    TestTakerModal
  },
  props: {
    testTakerId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    status: status
  }),
  computed: {
    testTaker () {
      return this.$store.getters.testTaker(this.testTakerId)
    },
    delivery () {
      return this.$store.getters.delivery
    },
    fancyStatus () {
      return this.$store.getters.fancyStatus(this.testTakerId)
    },
    fancyTestQuestionNo () {
      return this.$store.getters.fancyTestQuestionNo(this.testTakerId)
    },
    statusColor () {
      switch (this.testTaker.status) {
        case status.DISCONNECTED:
          return 'danger'
        case status.CONNECTED:
          return 'warning'
        case status.IN_PROGRESS:
          return 'success'
        case status.FINISHED:
          return 'success'
      }
      return null
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
  .test-taker
    display grid
    grid-template-rows 45% 45% 10%
  .test-taker-header
    display flex
    justify-content center
    align-content center
</style>
