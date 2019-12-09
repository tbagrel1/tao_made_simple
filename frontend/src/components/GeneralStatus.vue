<template lang="pug">
    b-container(fluid)#general-status
        b-row(:style="{ 'background-color': statusColor }" align-h="around")
            b-col(cols="2")
                b-alert.generalStatus(variant="danger" show) {{"Deconnecté : " + nbDisconnected }}
            b-col(cols="2")
                b-alert.generalStatus(variant="warning" show) {{"Connecté : " + nbConnected }}
            b-col(cols="2")
                b-alert.generalStatus(variant="success" show) {{"En test : " + nbInProgress }}
            b-col(cols="2")
                b-alert.generalStatus(variant="success" show) {{"Terminé : " + nbFinished }}
            b-col(cols="2")
                b-alert.generalStatus(variant="light" show) {{"Moyenne de progression : " + averageProgressionString }}
</template>

<script>
export default {
  name: 'GeneralStatus',
  computed: {
    nbDisconnected () {
      return this.$store.getters.nbDisconnected
    },
    nbConnected () {
      return this.$store.getters.nbConnected
    },
    nbInProgress () {
      return this.$store.getters.nbInProgress
    },
    nbFinished () {
      return this.$store.getters.nbFinished
    },
    averageProgressionString () {
      return this.$store.getters.averageProgressionString
    },
    statusColor () {
      if (this.$store.getters.nbDisconnected > 0) {
        return 'rgba(255,217,217,1)'
      } else if (this.$store.getters.nbConnected > 0) {
        return 'rgba(255,243,205,1)'
      } else {
        return 'rgba(212,237,218,1)'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
    .generalStatus {
        width 120%
        margin-top  5px
        margin-bottom  5px
        margin-left -30px
    }
</style>
