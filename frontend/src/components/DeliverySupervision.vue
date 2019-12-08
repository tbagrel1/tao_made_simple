<template lang="pug">
    b-row
      b-col(cols="12")
        Header
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
