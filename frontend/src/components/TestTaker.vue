<template lang="pug">
  b-col#candidate.container.card(cols="4")
    div#candidate-infos(@click="toggleDetails()").card-body
      div#firstname.h4.card-title {{ testTaker.firstname }} ({{ testTaker.id }})
      div#status-connected(v-if="testTaker.status === status.CONNECTED || testTaker.status === status.IN_PROGRESS").alert.alert-success Statut : {{ fancyStatus }}
      div#status-disconnected(v-if="testTaker.status === status.DISCONNECTED").alert.alert-danger Statut : {{ fancyStatus }}
      div#status-unknown(v-if="testTaker.status === status.FINISHED").alert.alert-warning Statut : {{ fancyStatus }}
      b-progress(:value="fancyTestQuestionNo" :max="delivery.testNbQuestion")
      TestTakerModal(v-if="detailsActive" :id="id")
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
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    detailsActive: false,
    status: status
  }),
  computed: {
    testTaker () {
      return this.$store.getters.testTaker(this.id)
    },
    delivery () {
      return this.$store.getters.delivery
    },
    fancyStatus () {
      return this.$store.getters.fancyStatus(this.id)
    },
    fancyTestQuestionNo () {
      return this.$store.getters.fancyTestQuestionNo(this.id)
    }
  },
  methods: {
    toggleDetails () {
      this.detailsActive = !this.detailsActive
    }
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
