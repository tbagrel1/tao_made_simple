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
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    },
    closeTime: {
      type: Number,
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
        this.timerEnd = new Date(new Date(this.endTime * 1000) - this.currentTime)
        this.timerClose = new Date(new Date(this.closeTime * 1000) - this.currentTime)
      }, 500)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
