<template lang="pug">
  b-row
    b-col(cols="12")
      b-button(@click="chooseDelivery") Clique sur moi !
</template>

<script>
export default {
  /*
   * Quand ce composant est appelé, il peut accéder à la liste des deliveries
   * disponibles avec this.deliveries (computed)
   */
  name: 'DeliverySelection',
  components: {
  },
  computed: {
    deliveries () {
      return this.$store.getters.deliveries
    }
  },
  methods: {
    async chooseDelivery () {
      await this.$store.dispatch('chooseDelivery', 'i15758961531802215') // while delivery selection is not implemented
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
