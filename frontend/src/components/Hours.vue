<template lang="pug">
  div#hours
    span#start Heure de départ : {{ getTime(startTime) }}
    span#datetime Il est : {{ getTime(currentTime) }}
    span#last Heure de fin (au plus tôt) : {{ getTime(endTime) }}
    span#closing Heure de clôture : {{ getTime(ClosingTime) }}
</template>

<script>
export default {
  name: 'Hours',
  props: {
    startTime: Date,
    currentTime: Date,
    endTime: Date,
    closingTime: Date
  },
  methods: {
    getTime: function (test) { // Time left before the end of the exam.
      let date = new Date(test)
      return date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds() + (date.getSeconds() > 1 ? 's' : '')
    }
  }
}

</script>

<style scoped lang="stylus">
</style>
