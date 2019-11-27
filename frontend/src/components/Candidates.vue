<template lang="pug">
  div#candidates
    span#firstname Firstname : {{ firstname }}
    span#id ID : {{ id }}
    span#status Status : {{ statusMessage }}
    // span#progress Progress : {{ progress }}
    // Details(:disabled=detailsActive @click="toggleDetailsActive")
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
    progress: () => { // Progress of the candidate
      try {
        return Math.floor(this.questionNo / this.nbQuestions)
      } catch (e) {
        console.log('Error')
      }
    },
    statusMessage: () => { // Status message displayed
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
    toggleDetailsActive: () => { // Toggle details of the candidate
      this.active = !this.active
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
