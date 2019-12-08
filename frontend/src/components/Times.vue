<template lang="pug">
  b-container(fluid)#times
    b-row
      b-col
        b-card
          Timer(message="Temps avant fin du dernier candidat" :timeString="maxTestTakerRemainingDurationString")
          Timer(message="Temps avant clôture" :timeString="remainingDurationBeforeClosingString")
      b-col
        b-card
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
    maxTestTakerRemainingDurationString: 'inconnu',
    remainingDurationBeforeClosingString: 'inconnu',
    currentTimeString: 'inconnu'
  }),
  computed: {
    openingTimeString () {
      return this.$store.getters.openingTimeString
    },
    closingTimeString () {
      return this.$store.getters.closingTimeString
    }
  },
  mounted () {
    this.$refreshGetterValue(this, 'currentTimeString')
    this.$refreshGetterValue(this, 'maxTestTakerRemainingDurationString')
    this.$refreshGetterValue(this, 'remainingDurationBeforeClosingString')
  }
}
</script>

<style scoped lang="stylus">
</style>
