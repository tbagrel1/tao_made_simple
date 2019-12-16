<template lang="pug" >
  b-container(fluid)
    b-row
      b-col(cols="12")
        b-form-select.mb-5(
          v-model="selectedDeliveryId"
          :options="deliveries"
          value-field="id"
          text-field="name"
        )
        b-button(@click="chooseDelivery" v-if="selectedDeliveryId !== null" size="lg" variant="primary") Superviser cet examen

</template>

<script>
export default {
  components: {
  },
  data: () => ({
    selectedDeliveryId: null
  }),
  computed: {
    deliveries () {
      return this.$store.getters.deliveries
    }
  },
  methods: {
    chooseDelivery () {
      this.$store.dispatch('chooseDelivery', this.selectedDeliveryId)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
