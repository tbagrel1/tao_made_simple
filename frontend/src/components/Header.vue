<template lang="pug">
  div#header
    GeneralInformation
    Times
    GeneralStatus
</template>

<script>
import GeneralInformation from './GeneralInformation.Vue'
import Times from './Times.Vue'
import GeneralStatus from './GeneralStatus.Vue'
export default {
  name: 'Header',
  components: {
    GeneralStatus,
    GeneralInformation,
    Times
  },
  props: {
    times: {
      type: Object,
      required: true
    },
    generalInformation: {
      type: Object,
      required: true
    },
    generalStatus: {
      type: Object,
      required: true
    }
  },
  data: () => ({
  }),
  mounted () {
  },
  methods: {
    getCurrentTime () {
      this.currentTime = new Date()
    },
    remainClose () { // Time left before the close of the exam.
      this.close = this.currentTime + this.times.close
    },
    remainEnd () { // Time left before the end of the exam.
      this.end = this.currentTime + this.times.end
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
