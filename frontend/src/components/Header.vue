<template lang="pug">
  div#header
    GeneralInformation
    Times
    GeneralStatus
</template>

<script>
import GeneralInformation from './GeneralInformation.Vue'
import Times from './Times.Vue'
import GeneralStatus from './GeneralStatus.Vue'
export default {
  name: 'Header',
  components: {
    GeneralStatus,
    GeneralInformation,
    Times
  },
  props: {
    times: {
      type: Object,
      required: true
    },
    generalInformation: {
      type: Object,
      required: true
    }
  },
  data: () => ({
  }),
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
