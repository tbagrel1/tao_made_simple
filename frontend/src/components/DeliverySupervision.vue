<template lang="pug">
  b-container(fluid)
    b-row
      b-col(cols="12")
        Header
    b-row
      b-col(cols="12")
        Tabs
</template>

<script>
import Header from './Header'
import Tabs from './Tabs'
export default {
  name: 'DeliverySupervision',
  components: {
    Header,
    Tabs
  }
}
</script>

<style scoped lang="stylus">
</style>
