<template lang="pug">
  div#hours
    span#start Heure de départ : {{ startTime }}
    span#datetime Il est : {{ currentTime }}
    span#last Heure de fin (au plus tôt : {{ firstEndTime }}
    span#end Heure de clôture : {{ endTime }}
</template>

<script>
export default {
  name: 'Hours',
  props: {
      startTime: Date,
      currentTime: Date,
      firstEndTime: Date,
      endTime: Date,
  },
}
</script>

<style scoped lang="stylus">
</style>
