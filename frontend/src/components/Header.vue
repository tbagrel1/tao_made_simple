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
      startTime: Date,
      endFirstTime: Date,
      endTime: Date
    },
    generalInformation: {
      moduleName: String,
      testName: String
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
