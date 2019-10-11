<template lang="pug">
  div#timers
    span#message {{ message }}
    span#time {{ time }}
</template>

<script>
export default {
  name: 'Timers',
  props: {
    message: String,
    time: Date
  },
  mounted () {
    // Split hours in segment here.
    // Make it beautiful.
  }
}
</script>

<style scoped lang="stylus">
</style>
