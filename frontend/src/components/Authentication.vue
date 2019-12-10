<template lang="pug">
  b-container(fluid)#authentication
    b-form-group(label-for="username")
      b-form-input(placeholder="Utilisateur" type="text" v-model="username" @keyup.enter="submit" trim)#username
    b-form-group(label-for="password")
      b-form-input(placeholder="Mot de passe" type="password" v-model="password" @keyup.enter="submit" trim)#password
    b-btn(variant="primary" @click="submit" v-if="username.length !== 0 && password.length !== 0")#connexion Se connecter
    b-alert(variant="danger" :show="$store.state.refreshAuthenticationStatus === refreshStatus.ERROR") Incorrect credentials
</template>

<script>
import { refreshStatus } from '../constants'

export default {
  name: 'Authentication',
  data: () => ({
    username: '',
    password: '',
    refreshStatus
  }),
  methods: {
    async submit () {
      this.$store.commit('setUsername', this.username)
      this.$store.commit('setPassword', this.password)
      await this.$store.dispatch('refreshAuthentication', { username: this.username, password: this.password })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
