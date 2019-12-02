<template lang="pug">
  b-container(fluid)#times
    b-row(align-h="between" align-v="center")
      b-col(cols="5")
        Timers(message="Temps avant fin du dernier candidat" :time="timerEnd")
        Timers(message="Temps avant clôture" :time="timerClose")
      b-col(cols="5")
        Timers(message="Heure d'ouverture" :time="new Date(startTime * 1000)")
        Timers(message="Heure actuelle" :time="currentTime")
        Timers(message="Heure de clôture" :time="new Date(closeTime * 1000)")
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
