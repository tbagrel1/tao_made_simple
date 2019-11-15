<template lang="pug">
  div#candidates
    span#name {{ name }}
    span#id {{ id }}
    span#status {{ statusMessage }}
    span#progress {{ progress }}
    Details(:disabled=detailsActive @click="toggleDetailsActive")
</template>

<script>
import Details from './Details.Vue'
export default {
  name: 'Candidates',
  components: {
    Details
  },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    questionNo: {
      type: String,
      required: true
    },
    nbQuestions: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    testDuration: {
      type: String,
      required: true
    }
  },
  data: () => ({
    detailsActive: false
  }),
  computed: {
    progress: () => { // Progress of the candidate
      return Math.floor(this.questionNo / this.nbQuestion)
    },
    statusMessage: () => { // Status message displayed
      switch (this.status) {
        case 0:
          return 'disconnected'
        case 1:
          return 'connected'
        default:
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
