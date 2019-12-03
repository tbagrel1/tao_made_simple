<template lang="pug">
  b-container(fluid)#times
    b-row(align-h="between" align-v="center")
      b-col(cols="5")
        Timer(message="Temps avant fin du dernier candidat" :timeString="maxTestTakerRemainingDurationString")
        Timer(message="Temps avant clôture" :timeString="remainingDurationBeforeClosingString")
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
    _maxTestTakerRemainingDurationString: 'inconnu',
    _remainingDurationBeforeClosingString: 'inconnu',
    _currentTimeString: 'inconnu'
  }),
  computed: {
    openingTimeString () {
      return this.$store.getters.openingTimeString
    },
    closingTimeString () {
      return this.$store.getters.closingTimeString
    },
    currentTimeString () {
      return this.$refreshGetterValue(this, 'currentTimeString')
    },
    maxTestTakerRemainingDurationString () {
      return this.$refreshGetterValue(this, 'maxTestTakerRemainingDurationString')
    },
    remainingDurationBeforeClosingString () {
      return this.$refreshGetterValue(this, 'remainingDurationBeforeClosingString')
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
