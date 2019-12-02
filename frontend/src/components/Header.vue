<template lang="pug">
  div#header
    GeneralInformation
    Times(:startTime="header.time.start" :endTime="endTime" :closeTime="header.time.close")
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
    },
    accounts: {
      type: Array(Object),
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    testDuration: {
      type: Number,
      required: true
    }
  },
  methods: {
    updateEndTime: function () {
      for (let i = 0; i < this.accounts.length; i++) {
        if ((this.testDuration && this.accounts[i].startTime && this.accounts[i].status === 1) &&
          (!this.endTime || this.endTime < (this.header.time.close - this.accounts[i].startTime))) {
          this.endTime = this.accounts[i].startTime + this.testDuration
        }
      }
    }
  },
  mounted: function () {
    this.updateEndTime()
  },
  beforeUpdate: function () {
    this.updateEndTime()
  }
}
</script>

<style scoped lang="stylus">
</style>
