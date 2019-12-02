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
import Details from './Details'
export default {
  name: 'Candidates',
  components: {
    Details
  },
  props: {
    id: {
      type: String,
      default: '',
      required: false
    },
    type: {
      type: [String, Number],
      default: 3,
      required: false
    },
    firstname: {
      type: String,
      default: '',
      required: false
    },
    surname: {
      type: String,
      default: '',
      required: false
    },
    status: {
      type: [Number, String],
      required: false
    },
    questionNo: {
      type: Number,
      required: false
    },
    nbQuestions: {
      type: Number,
      required: false
    },
    startTime: {
      type: Date,
      required: false
    },
    testDuration: {
      type: Date,
      required: false
    }
  },
  data: () => ({
    detailsActive: false
  }),
  computed: {
    progress () { // Progress of the candidate
      try {
        return Math.floor(this.questionNo / this.nbQuestions)%100
      } catch (e) {
        console.log('Error')
      }
      return 0
    },
    statusMessage () { // Status message displayed
      if (!isNaN(this.status)) {
        switch (this.status) {
          case 0:
            return 'déconnecté'
          case 1:
            return 'connecté'
          default:
            return 'inconnu'
        }
      } else {
        return 'inconnu'
      }
    }
  },
  methods: {
    toggleDetailsActive () { // Toggle details of the candidate
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
