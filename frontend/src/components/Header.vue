<template lang="pug">
  div#header
    GeneralInformation
    Times
    GeneralStatus
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
