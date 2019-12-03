<template lang="pug">
  b-container(fluid)#times
    b-row(align-h="between" align-v="center")
      b-col(cols="5")
        Timer(message="Temps avant fin du dernier candidat" :timeString="currentMaxRemainingDurationForTestTakers")
        Timer(message="Temps avant clôture" :timeString="currentRemainingDurationBeforeClosing")
      b-col(cols="5")
        Timer(message="Heure d'ouverture" :timeString="openingTimeString")
        Timer(message="Heure actuelle" :timeString="currentTimeString")
        Timer(message="Heure de clôture" :timeString="closingTimeString")
</template>

<script>
import Timer from './Timer.vue'
export default {
  name: 'Times',
  components: {
    Timer
  },
  data: () => ({
    currentMaxRemainingDurationForTestTakers: null,
    currentRemainingDurationBeforeClosing: null,
    currentTimeString: null
  })
  // TODO: update times
}
</script>

<style scoped lang="stylus">
</style>
