<template lang="pug">
  b-container(fluid)#general-status
    b-row(align-h="around")
      b-col(cols="2")
        span#disconnected {{ nbDisconnected }}
      b-col(cols="2")
        span#connected {{ nbConnected }}
      b-col(cols="2")
        span#inTest {{ nbInProgress }}
      b-col(cols="2")
        span#finished {{ nbFinished }}
      b-col(cols="2")
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
