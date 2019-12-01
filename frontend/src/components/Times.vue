<template lang="pug">
  div#times
    Timers(message="Temps restant avant la clôture" :time="timerClose")
    Timers(message="Temps restant avant la fin du dernier candidat" :time="timerEnd")
    Hours(:startTime ="startTime" :currentTime ="currentTime" :endTime ="endTime" :closingTime ="closeTime")
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
  beforeMount () {
    this.updateTimer()
  },
  data () {
    return {
      timerEnd: new Date(),
      timerClose: new Date(),
      currentTime: new Date()
    }
  },
  methods: {
    updateTimer: function () { // Time left before the end of the exam.
      setInterval(() => {
        this.currentTime = new Date()
        this.timerEnd = new Date(this.endTime - this.currentTime)
        this.timerClose = new Date(this.closeTime - this.currentTime)
      }, 500)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
