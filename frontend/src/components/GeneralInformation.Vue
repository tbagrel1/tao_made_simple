<template lang="pug">
  div#generalInformation
      span#moduel {{ moduleName }}
      span#name {{ testName }}
      span#date {{ currentDate }}
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
    }
  },
  data: () => ({
    currentDate: (new Date()).getDate() // Today's date.
  })
}
</script>

<style scoped lang="stylus">
</style>
