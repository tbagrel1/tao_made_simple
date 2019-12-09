<template lang="pug">
  b-container(fluid)#header
    b-row
      b-col(cols="12")
        GeneralInformation
        br
    b-row
      b-col(cols="12")
        Times
        br
    b-row
      b-col(cols="12")
        GeneralStatus
        br
</template>

<script>
import GeneralInformation from './GeneralInformation.vue'
import GeneralStatus from './GeneralStatus.vue'
import Times from './Times.vue'
export default {
  name: 'Header',
  components: {
    GeneralStatus,
    GeneralInformation,
    Times
  }
}
</script>

<style scoped lang="stylus">
</style>
