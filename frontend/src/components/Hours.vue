<template lang="pug">
  div#hours
    span#start Heure de départ : {{ getTime(startTime) }}
    span#datetime Il est : {{ getTime(currentTime.getTime() / 1000) }}
    span#last Heure de fin (au plus tôt) : {{ getTime(endTime) }}
    span#closing Heure de clôture : {{ getTime(closingTime) }}
</template>

<script>
export default {
  name: 'Hours',
  props: {
    startTime: Number,
    currentTime: Date,
    endTime: Number,
    closingTime: Number
  },
  methods: {
    getTime: function (time) { // Time left before the end of the exam.
      let date = new Date(time * 1000)
      return date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
