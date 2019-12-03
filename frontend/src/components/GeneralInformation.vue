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
    _currentDateString: 'inconnu'
  }),
  computed: {
    delivery () {
      return this.$store.getters.delivery
    },
    currentDateString () {
      return this.$refreshGetterValue(this, 'currentDateString')
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
