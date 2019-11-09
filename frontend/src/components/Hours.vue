<template lang="pug">
  div#hours
    span#start Heure de départ : {{ spanStartTime }}
    span#datetime Il est : {{ spanCurrentTime }}
    span#last Heure de fin (au plus tôt) : {{ spanFirstEndTime }}
    span#closing Heure de clôture : {{ spanClosingTime }}
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
  mounted () {
    // Split hours in segment here.
    // Make it beautiful.
    this.spanStartTime = this.startTime
    this.spanCurrentTime = this.currentTime
    this.spanFirstEndTime = this.endTime
    this.spanClosingTime = this.ClosingTime
  }
}

</script>

<style scoped lang="stylus">
</style>
