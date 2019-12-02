<template lang="pug">
  b-row
    b-col(cols="6")
      b-button(variant="secondary" block) {{ message }}
    b-col(cols="6")
      b-button(variant="outline-secondary" block) {{ formatTimer(time) }}
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
      return this.getHour(time) + this.getMinute(time) + this.getSecond(time)
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
