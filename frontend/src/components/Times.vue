<template lang="pug">
  div#times
    Timers(message="Temps restant avant la clôture" :time="remainingCloseTime")
    Timers(message="Temps restant avant la fin du dernier candidat" :time="remainingEndTime")
    Hours(:startTime ="this.startTime" :currentTime ="currentTime" :endTime ="remainingEndTime" :closingTime ="remainingCloseTime")
</template>

<script>
import Timers from './Timers.vue'
import Hours from './Hours.vue'
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
    endTime: {
      type: Date,
      required: true
    },
    closeTime: {
      type: Date,
      required: true
    }
  },
  computed: {
    remainingCloseTime: () => { // Time left before the end of the exam.
      return this.closeTime - this.currentTime()
    },
    remainingEndTime: () => { // Time left before the end of the exam.
      return this.endTime - this.currentTime()
    },
    currentTime: () => {
      return (new Date()).getTime()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
