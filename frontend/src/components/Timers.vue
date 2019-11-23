<template lang="pug">
  div#timers
    span#message {{ message }}
    span#time {{ formatTimer(time) }}
</template>

<script>
export default {
  name: 'Timers',
  props: {
    message: String,
    time: Date
  },
  methods: {
    formatTimer: function (time) {
      let timeDate = new Date(time)
      return this.getHour(timeDate) + this.getMinute(timeDate) + this.getSecond(timeDate)
    },
    getHour: function (time) {
      let hours = time.getHours()
      return hours ? hours + ' : ' : ''
    },
    getMinute: function (time) {
      return time.getMinutes() + ' : '
    },
    getSecond: function (time) {
      return time.getSeconds()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
