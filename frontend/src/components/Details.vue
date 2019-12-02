<template lang="pug">
  div#details
    div#question-no Numéro de la question en cours : {{ questionNo }}
    div#start-time Heure de démarrage : {{ startTime }}
</template>

<script>
export default {
  name: 'Details',
  props: {
    questionNo: {
      type: Number,
      required: false
    },
    startTime: {
      type: Date,
      required: false
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
