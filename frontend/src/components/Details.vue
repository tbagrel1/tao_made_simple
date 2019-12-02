<template lang="pug">
  div#details
    div#question-no Question : {{ questionNo + 1 }} / {{ nbQuestions }}
    div#start-time Heure de démarrage : {{ fancyStartTime }}
</template>

<script>
export default {
  name: 'Details',
  props: {
    nbQuestions: {
      type: Number,
      required: true
    },
    questionNo: {
      type: Number,
      required: false
    },
    startTime: {
      type: Number,
      required: false
    }
  },
  computed: {
    fancyStartTime () {
      const startDate = new Date(this.startTime * 1000)
      return startDate.getHours().toString() + ':' + startDate.getMinutes().toString() + ':' + startDate.getSeconds()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
