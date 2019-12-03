<template lang="pug">
  b-col#candidate.container.card(cols="4")
    div#candidate-infos(@click="toggleDetailsActive()").card-body
      div#firstname.h4.card-title {{ firstname }} ({{ id }})
      div#status-connected(v-if="status === 1").alert.alert-success Statut : {{ statusMessage }}
      div#status-disconnected(v-if="status === 0").alert.alert-danger Statut : {{ statusMessage }}
      div#status-unknown(v-if="status >= 2").alert.alert-warning Statut : {{ statusMessage }}
      b-progress(:value="questionNo" :max="nbQuestions")
      Details(v-if="detailsActive" :type="type" :questionNo="questionNo" :startTime="startTime" :nbQuestions="nbQuestions")
</template>

<script>
import CandidateModal from './CandidateModal'
export default {
  name: 'Candidates',
  components: {
    CandidateModal
  },
  props: {
    id: {
      type: String,
      required: true
    }
  }
  // TODO: update time
}
</script>

<style scoped lang="stylus">
  progress-bar
    role 'progressbar'
    aria-valuenow 20
    aria-valuemin 0
    aria-valuemax 100
</style>
