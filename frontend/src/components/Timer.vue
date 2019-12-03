<template lang="pug">
  b-row
    b-col(cols="6")
      b-button(variant="secondary" block) {{ message }}
    b-col(cols="6")
      b-button(variant="outline-secondary" block) {{ timeString }}
</template>

<script>
export default {
  name: 'Timers',
  props: {
    message: {
      type: String,
      required: true
    },
    timeString: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
