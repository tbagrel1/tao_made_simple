<template lang="pug">
  b-modal(:id="`test-taker-details-${testTakerId}`" hide-footer :title="`${testTaker.firstname} ${testTaker.lastname}`")
    b-container(fluid)
      b-row
        b-col(cols="12")
          span Avancement : {{ progressionString }}
      b-row
        b-col(cols="12")
          span Temps restant : {{ testTakerRemainingDurationString }}
</template>

<script>
export default {
  name: 'Details',
  props: {
    testTakerId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    testTakerRemainingDurationString: 'inconnu'
  }),
  computed: {
    testTaker () {
      return this.$store.getters.testTaker(this.testTakerId)
    },
    progressionString () {
      return this.$store.getters.progressionString(this.testTakerId)
    }
  },
  mounted () {
    this.$refreshGetterValue(this, 'testTakerRemainingDurationString', [this.testTakerId])
  }
}
</script>

<style scoped lang="stylus">
</style>
