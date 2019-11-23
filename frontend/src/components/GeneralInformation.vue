<template lang="pug">
  div#generalInformation
      span#moduel {{ moduleName }}
      span#name {{ testName }}
      span#date {{ date }}
</template>

<script>
export default {
  name: 'GeneralInformation',
  props: {
    moduleName: {
      type: String,
      required: true
    },
    testName: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  mounted: function () {
    let currentDate = new Date()
    let day = currentDate.getDate()
    let mounth = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    this.date = day + '/' + mounth + '/' + year
  }
}
</script>

<style scoped lang="stylus">
</style>
