<template lang="pug">
  b-col(cols="3")
    b-card.test-taker(@click="$bvModal.show(`test-taker-details-${testTakerId}`)")
      b-card-title.test-taker-name
        h3 {{ testTaker.firstname }} {{ testTaker.lastname }}
      b-card-body
        b-container(fluid)
          b-row
            b-col(cols="12")
              b-alert(:variant="statusColor" show) Statut : {{ fancyStatus }}
          b-row
            b-col(cols="12")
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
  progress-bar
    role 'progressbar'
    aria-valuenow 20
    aria-valuemin 0
    aria-valuemax 100
</style>
