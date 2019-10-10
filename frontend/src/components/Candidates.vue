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
      Details,
  },
  props: {
      type: String,
      name: String,
      id: String,
      status: Number,
      questionNumber: Number,
      numberOfQuestions: Number,
  },
  data: () => ({
      detailsActive: false,
  }),
  methods: {
      toggleDetailsActive: () => { // Toggle details of the candidate
          this.active = !this.active;
      }
  },
  computed: {
      progress: () => { // Progress of the candidate
          return Math.floor(this.questionNumber/this.numberOfQuestions);
      },
      statusMessage: () => { // Status message displayed
          switch (this.status) {
              case 0: return "disconnected";
                break;
              case 1: return "connected";
                break;
              default: return "unknown";
          }
      }
  }
}
</script>

<style scoped lang="stylus">
</style>
