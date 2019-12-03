<template lang="pug">
  div#generalStatus
    span#disconnected {{ nbDisconnected }}
    span#connected {{ nbConnected }}
    span#inTest {{ nbInProgress }}
    span#finished {{ nbFinished }}
    span#progress {{ averageProgressionString }}
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
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
