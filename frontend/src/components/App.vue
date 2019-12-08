<template lang="pug">
  div#app
    b-navbar
      b-navbar-brand
        h1 TAO Made Simple
    Loading(v-if="isRefreshInProgress")
    Error(v-else-if="isRefreshError")
    b-container(v-else fluid)
      DeliverySupervision(v-if="isDeliverySelected")
      DeliverySelection(v-else)
</template>

<script>
import Error from './Error'
import Loading from './Loading'
import DeliverySupervision from './DeliverySupervision'
import DeliverySelection from './DeliverySelection'
export default {
  name: 'App',
  components: {
    Error,
    Loading,
    DeliverySupervision,
    DeliverySelection
  },
  computed: {
    isDeliverySelected () {
      return this.$store.getters.isDeliverySelected
    },
    isRefreshInProgress () {
      return this.$store.getters.isRefreshInProgress
    },
    isRefreshError () {
      return this.$store.getters.isRefreshError
    }
  },
  async mounted () {
    await this.$store.dispatch('refreshDeliveries')
  }
}
</script>

<style scoped lang="stylus">
</style>
