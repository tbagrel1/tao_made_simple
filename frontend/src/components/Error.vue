<template lang="pug">
  b-container(fluid)
    b-row
      b-col(cols="12")
        b-alert(variant="danger" show) Une erreur est survenu lors du rafraîchissement. Vérifiez votre connexion internet
</template>

<script>
export default {
  name: 'Error',
  components: {
  }
}
</script>

<style scoped lang="stylus">
</style>
