<template lang="pug">
  b-container(fluid)#general-information
    b-row
      b-col(cols="12")
        span#delivery-label {{ delivery.label }}
    b-row
      b-col(cols="12")
        span#test-label {{ delivery.testLabel }}
    b-row
      b-col(cols="12")
        span#current-date {{ currentDateString }}
</template>

<script>
export default {
  name: 'GeneralInformation',
  data: () => ({
    currentDateString: 'inconnu'
  }),
  computed: {
    delivery () {
      return this.$store.getters.delivery
    }
  },
  mounted () {
    this.$refreshGetterValue(this, 'currentDateString')
  }
}
</script>

<style scoped lang="stylus">
</style>
