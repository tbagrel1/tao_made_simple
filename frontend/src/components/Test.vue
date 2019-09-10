<template lang="pug">
  div#parent
    span#child1(@click="changeText") {{ child1Text }}
    span#child2 {{ child2Text }}
</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    child1Text: 'Hello',
    child2Text: 'World!'
  }),
  methods: {
    changeText () {
      this.child1Text = 'Yop!!'
    }
  }
}
</script>

<style scoped lang="stylus">
  #child1
    font-weight bold
</style>
