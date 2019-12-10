<template lang="pug">
  b-container(fluid)#general-information
    b-row
      b-col(cols="6")
        b-card
          b-row(align-v="center")
            b-col(cols="8")
              b-alert.generalInformation(variant="light" show) {{ "Matière : " }}
            b-col(cols="4")
              b-alert.generalInformation(variant="dark" show) {{ delivery.label }}
          b-row(align-v="center")
            b-col(cols="8")
              b-alert.generalInformation(variant="light" show) {{ "Nom du test : " }}
            b-col(cols="4")
              b-alert.generalInformation(variant="dark" show) {{ delivery.testLabel }}
          b-row(align-v="center")
            b-col(cols="8")
              b-alert.generalInformation(variant="light" show) {{ "Date : " }}
            b-col(cols="4")
              b-alert.generalInformation(variant="dark" show) {{ currentDateString }}
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
    .generalInformation{
        font-size large
    }
</style>
