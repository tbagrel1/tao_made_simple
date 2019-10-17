<template lang="pug">
  div#generalStatus
    span#connected {{ numberConnected }}
    span#inTest {{ numberInTest }}
    span#finished {{ numberFinished }}
    span#progress {{ globalProgress }}
</template>

<script>
export default {
  name: 'GeneralStatus',
  props: {
    numberConnected: {
      type: Number,
      required: true
    },
    numberInTest: {
      type: Number,
      required: true
    },
    numberFinished: {
      type: Number,
      required: true
    },
    globalProgress: {
      type: Number,
      required: true
    }
  },
  data: () => ({
  }),
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="stylus">
</style>
