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
    testTakerRemainingDurationString: 'inconnu'
  }),
  computed: {
    progressionString () {
      return this.$store.getters.progressionString(this.id)
    }
  },
  mounted () {
    this.$refreshGetterValue(this, 'testTakerRemainingDurationString', [this.id])
  }
}
</script>

<style scoped lang="stylus">
</style>
