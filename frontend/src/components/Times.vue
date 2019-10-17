<template lang="pug">
  div#times
    Timers(message="Temps restant avant la clôture" :time="remainingEndTime")
    Timers(message="Temps restant avant la fin du dernier candidat" :time="remainingFirstEndTime")
    Hours
</template>

<script>
import Timers from './Timers.Vue'
import Hours from './Hours.Vue'
export default {
  name: 'Times',
  components: {
    Timers,
    Hours
  },
  props: {
    startTime: {
      type: Date,
      required: true
    },
    endFirstTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  computed: {
    remainingEndTime: () => { // Time left before the end of the exam.
      return this.endTime - this.currentTime()
    },
    remainingFirstEndTime: () => { // Time left before the end of the exam.
      return this.endFirstTime - this.currentTime()
    },
    currentTime: () => {
      return (new Date()).getTime()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
