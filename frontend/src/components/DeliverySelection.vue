<template lang="pug" >
  b-row
    b-col(cols="12")
      b-form-select(
        v-model="selectedDelivery"
        :options="deliveries"
        value-field="id"
        text-field="name").mb-5
      b-button(@click="chooseDelivery" :disabled="selectedDelivery === null" size="lg" variant="primary") Superviser cet examen

</template>

<script>
export default {
  components: {
  },
  data: () => ({
    selectedDelivery: null
  }),
  computed: {
    deliveries () {
      return this.$store.getters.deliveries
    }
  },
  async mounted () {
    await this.$store.dispatch('refreshDeliveries')
  },
  methods: {
    async chooseDelivery () {
      await this.$store.dispatch('chooseDelivery', this.selectedDelivery) // while delivery selection is not implemented
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
