<template lang="pug">
  b-container(fluid)
    b-row
      b-col(cols="12")
        b-alert(:variant="supervisionAlert.variant" show) {{ supervisionAlert.message }}
</template>

<script>
import { alerts } from '../constants'

export default {
  name: 'SupervisionAlert',
  components: {
  },
  data: () => ({
    alerts
  }),
  computed: {
    supervisionAlert () {
      return this.$store.getters.supervisionAlert
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
