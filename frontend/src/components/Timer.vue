<template lang="pug">
  b-row(align-v="center")
    b-col(cols="8")
      b-alert.message(variant="light" show) {{ message }}
    b-col(cols="4")
      b-alert.time(variant="dark" show) {{ timeString }}
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
  .time
    text-align center
  .message
    font-size large
</style>
