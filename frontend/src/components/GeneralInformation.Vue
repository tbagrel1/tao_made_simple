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
    moduleName: String,
    testName: String
  },
  data: () => ({
    currentDate: (new Date()).getDate() // Today's date.
  })
}
</script>

<style scoped lang="stylus">
</style>
