<template lang="pug">
  b-container(fluid)#authentication
    b-form-group
      b-form-input#username(placeholder="Utilisateur" type="text" v-model="username" @keyup.enter="tryAuthentication" trim)
      b-form-input#password(placeholder="Mot de passe" type="password" v-model="password" @keyup.enter="tryAuthentication" trim)
    b-btn#log-in(variant="primary" @click="tryAuthentication" v-if="isFormFilled") Se connecter
    b-alert(:variant="authenticationAlert.variant" v-if="authenticationAlert !== alerts.NOTHING" show) {{ authenticationAlert.message }}
</template>

<script>
import { alerts } from '../constants'

export default {
  name: 'Authentication',
  data: () => ({
    alerts,
    username: '',
    password: ''
  }),
  computed: {
    authenticationAlert () {
      return this.$store.getters.authenticationAlert
    },
    isFormFilled () {
      return this.username.length !== 0 && this.password.length !== 0
    }
  },
  methods: {

    tryAuthentication () {
      this.$store.commit('setUsername', this.username)
      this.$store.commit('setPassword', this.password)
      this.$store.dispatch('tryAuthentication')
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
