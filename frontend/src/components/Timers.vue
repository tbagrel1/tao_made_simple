<template lang="pug">
  div#timers
    span#message {{ spanMessage }}
    span#time {{ spanTimer }}
</template>

<script>
export default {
  name: 'Timers',
  props: {
    message: String,
    time: Date
  },
  mounted () {
    // Split hours in segment here.
    // Make it beautiful.
    this.spanMessage = this.message
    this.spanTimer = this.getHour + this.getMinute + this.getSecond
  },
  methods: {
    getHour () {
      let hours = this.time.getHours()
      return hours ? hours + ' : ' : ''
    },
    getMinute () {
      return this.time.getMinutes() + ' : '
    },
    getSecond () {
      return this.time.getSeconds()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
