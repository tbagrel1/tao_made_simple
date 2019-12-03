<template lang="pug">
  div#details
    div#question-no Avancement : {{ progressionString }}
    div#start-time Temps restant : {{ testTakerRemainingDurationString }}
</template>

<script>
export default {
  name: 'Details',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    _testTakerRemainingDurationString: 'inconnu'
  }),
  computed: {
    progressionString () {
      return this.$store.getters.progressionString(this.id)
    },
    testTakerRemainingDurationString () {
      return this.$refreshGetterValue(this, 'testTakerRemainingDurationString', this.id)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
