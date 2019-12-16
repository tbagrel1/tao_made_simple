<template lang="pug">
  b-container(fluid)#times
    b-row
      b-col(cols="6")
        b-card
          b-container(fluid)
            b-row
              b-col(cols="12")
                Timer(message="Durée de l'examen" :timeString="testDurationString")
            b-row
              b-col(cols="12")
                Timer(message="Temps avant fin du dernier candidat" :timeString="maxTestTakerRemainingDurationString")
            b-row
              b-col(cols="12")
                Timer(message="Temps avant clôture" :timeString="remainingDurationBeforeClosingString")
      b-col(cols="6")
        b-card
          b-container(fluid)
            b-row
              b-col(cols="12")
                Timer(message="Heure d'ouverture" :timeString="openingTimeString")
            b-row
              b-col(cols="12")
                Timer(message="Heure actuelle" :timeString="currentTimeString")
            b-row
              b-col(cols="12")
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
    },
    testDurationString () {
      return this.$store.getters.testDurationString
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
