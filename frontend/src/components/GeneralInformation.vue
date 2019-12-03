<template lang="pug">
  div#generalInformation
      span#module {{ delivery.label }}
      span#name {{ delivery.testLabel }}
      span#date {{ currentDateString }}
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
