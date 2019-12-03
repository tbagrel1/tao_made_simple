<template lang="pug">
  div#tabs
    b-button-group#buttons
      button#candidates(@click="switchTab(1)" :class="(currentTab === 1 ? 'btn-primary' : 'btn-outline-primary') + ' btn btn-lg'") Participants
      button#emergency(@click="switchTab(2)" :class="(currentTab === 2 ? 'btn-primary' : 'btn-outline-primary') + ' btn btn-lg'") Autres types de comptes
    b-row#accounts-list()
      TestTaker(v-if="currentTab === 1"
        v-for="el in followed" :key="followed.id"
        :id="el.id"
      )
      TestTaker(v-if="currentTab === 2"
        v-for="el in unfollowed" :key="unfollowed.id"
        :id="el.id"
      )
</template>

<script>
import TestTaker from './TestTaker'
export default {
  name: 'Tabs',
  components: {
    TestTaker
  }
}
</script>

<style scoped lang="stylus">
</style>
