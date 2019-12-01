<template lang="pug">
  div#candidate
    p
      div#candidate-infos(@click="toggleDetailsActive()")
        div#firstname Nom : {{ firstname }}
        div#id ID : {{ id }}
        div#status Statut : {{ statusMessage }}
        div#progress Progression : {{ progress }}
        Details(v-if="detailsActive" :type="type" :questionNo="questionNo" :startTime="startTime")
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
        return Math.floor(this.questionNo / this.nbQuestions)
      } catch (e) {
        console.log('Error')
      }
      return 0
    },
    statusMessage () { // Status message displayed
      if (!isNaN(this.status)) {
        switch (this.status) {
          case 0:
            return 'disconnected'
          case 1:
            return 'connected'
          default:
            return 'unknown'
        }
      } else {
        return 'unknown'
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
</style>
