<template lang="pug">
  div#details
    div#question-no Question : {{ questionNo + 1 }} / {{ nbQuestions }}
    div#start-time Heure de démarrage : {{ fancyStartTime }}
</template>

<script>
export default {
  name: 'Details',
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
