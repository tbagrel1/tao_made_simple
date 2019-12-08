<template>
  <div>
  <select v-model="selectedDelivery">
    <option v-for="delivery in deliveries" :key="delivery.name" :value="delivery.id">
      {{ delivery.id }}, {{ delivery.name }}
    </option>
  </select>
  <button v-on:click="chooseDelivery">Cliquez sur moi !</button>

  </div>
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
      await this.$store.dispatch('chooseDelivery', 'i15697694169972137') // while delivery selection is not implemented
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
