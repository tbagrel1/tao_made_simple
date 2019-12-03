<template lang="pug">
  div#generalStatus
    span#connected {{ numberConnected }}
    span#inTest {{ numberInTest }}
    span#finished {{ numberFinished }}
    span#progress {{ globalProgress }}
</template>

<script>
export default {
  name: 'GeneralStatus'
}
</script>

<style scoped lang="stylus">
</style>
