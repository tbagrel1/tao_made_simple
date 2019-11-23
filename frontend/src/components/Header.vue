<template lang="pug">
  div#header
    GeneralInformation
    Times(:endTime ="header.time.end" :closeTime="header.time.close")
    GeneralStatus
</template>

<script>
import GeneralInformation from './GeneralInformation.vue'
import Times from './Times.vue'
import GeneralStatus from './GeneralStatus.vue'
export default {
  name: 'Header',
  components: {
    GeneralStatus,
    GeneralInformation,
    Times
  },
  props: {
    header: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
