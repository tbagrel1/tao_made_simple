<template lang="pug">
  div#app
    b-navbar
      b-navbar-brand
        h1 TAO Made Simple
    b-container( fluid)
      Loading(v-if="isRefreshInProgress")
      Error(v-else-if="isRefreshError")
      b-container(v-else fluid)
        Authentication(v-if="!isAuthenticated")
        DeliverySupervision(v-else-if="isAuthenticated && isDeliverySelected")
        DeliverySelection(v-else)
</template>

<script>
import Error from './Error'
import Loading from './Loading'
import DeliverySupervision from './DeliverySupervision'
import DeliverySelection from './DeliverySelection'
import Authentication from './Authentication'
export default {
  name: 'App',
  components: {
    Error,
    Loading,
    Authentication,
    DeliverySupervision,
    DeliverySelection
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
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
