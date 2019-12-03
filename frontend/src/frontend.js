import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/components/App'

import './globalStyle.styl'

const REFRESH_DELAY = 500

const TIME_FORMAT_OPTION = {
  hour: '2-digit',
  second: '2-digit',
  minute: '2-digit'
}
const DATE_FORMAT_OPTION = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit'
}

const formatAsDateString = (timestamp) => {
  const date = new Date(timestamp * 1000)
  date.toLocaleDateString('fr-FR', DATE_FORMAT_OPTION)
}
const formatAsTimeString = (timestamp) => {
  const date = new Date(timestamp * 1000)
  date.toLocaleDateString('fr-FR', TIME_FORMAT_OPTION)
}
const sortedTestTakerIds = (originalTestTakerIds) => {
  const testTakerIds = [...originalTestTakerIds]
  testTakerIds.sort((a, b) => a.lastname.localeCompare(b.lastname))
  return testTakerIds
}
const refreshGetterValue = (self, name, params = []) => {
  if (self['_' + name] === null) {
    const update = () => {
      self['_' + name] = self.$store.getters[name](...params)
    }
    update()
    setInterval(update, REFRESH_DELAY)
  }
  return self['_' + name]
}

Vue.prototype.$axios = axios
Vue.prototype.$status = {
  DISCONNECTED: 'disconnected',
  CONNECTED: 'connected',
  IN_PROGRESS: 'inProgress',
  FINISHED: 'finished'
}
Vue.prototype.$tab = {
  SUPERVISED: 0,
  UNSUPERVISED: 1
}
Vue.prototype.$formatAsTimeString = formatAsTimeString
Vue.prototype.$formatAsDateString = formatAsDateString
Vue.prototype.$refreshGetterValue = refreshGetterValue

Vue.use(Vuex)
Vue.use(BootstrapVue)

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    /* {
     id: String,
     label: String,
     name: String,
     openingTime: Number,
     closingTime: Number,
     testLabel: String,
     testDuration: Number,
     testNbQuestion: Number
     } */
    delivery: {
      id: 'i1110',
      label: 'Test de mathématiques',
      name: 'Test de mathématiques',
      openingTime: 1575382612,
      closingTime: 1575482612,
      testLabel: 'Test de mathématiques',
      testDuration: 4000,
      testNbQuestion: 12
    },
    testTakers: new Map([['i4456', {
      id: 'i4456',
      login: 'tchardon',
      firstname: 'Thibaut',
      lastname: 'CHARDON',
      status: Vue.prototype.$status.IN_PROGRESS,
      deliveryStartingTime: 1575382812,
      testQuestionNo: 4
    }], ['i5654', {
      id: 'i5654',
      login: 'sec118212',
      firstname: 'Compte',
      lastname: 'Secours 118212',
      status: 'disconnected',
      deliveryStartingTime: null,
      testQuestionNo: null
    }]]),
    testTakerIdToTab: new Map([
      ['i4456', Vue.prototype.$tab.SUPERVISED],
      ['i5654', Vue.prototype.$tab.UNSUPERVISED]
    ])
  },
  mutations: {
    addToDefaultTab: (state) => {
      const testTakerIds = Array.from(state.testTakers.keys())
      const newTestTakerIdToTab = new Map(state.testTakerIdToTab)
      for (const testTakerId of testTakerIds) {
        if (!state.testTakerIdToTab.has(testTakerId)) {
          const testTaker = state.testTakers.get(testTakerId)
          if (testTaker.login.toLowerCase().startsWith('sec')) {
            state.testTakerIdToTab = newTestTakerIdToTab.set(testTakerId, Vue.prototype.$tab.UNSUPERVISED)
          } else {
            state.testTakerIdToTab = newTestTakerIdToTab.set(testTakerId, Vue.prototype.$tab.SUPERVISED)
          }
        }
      }
      state.testTakerIdToTab = newTestTakerIdToTab
    },
    changeTab: (state, { testTakerId, tab }) => {
      const newTestTakerIdToTab = new Map(state.testTakerIdToTab)
      newTestTakerIdToTab.set(testTakerId, tab)
      state.testTakerIdToTab = newTestTakerIdToTab
    }
  },
  getters: {
    testTaker: (state, getters) => (testTakerId) => {
      return state.testTakers.get(testTakerId)
    },
    delivery: (state, getters) => {
      return state.delivery
    },
    fancyStatus: (state, getters) => (testTakerId) => {
      const testTaker = state.testTaker(testTakerId)
      switch (testTaker.status) {
        case Vue.prototype.$status.DISCONNECTED:
          return 'déconnecté'
        case Vue.prototype.$status.CONNECTED:
          return 'connecté'
        case Vue.prototype.$status.IN_PROGRESS:
          return 'en cours'
        case Vue.prototype.$status.FINISHED:
          return 'terminé'
      }
    },
    currentDateString: (state, getters) => () => {
      return formatAsDateString(new Date())
    },
    currentTimeString: (state, getters) => () => {
      return formatAsTimeString(new Date())
    },
    currentTimestamp: (state, getters) => () => {
      return new Date().getTime() / 1000
    },
    testTakerRemainingDuration: (state, getters) => (testTakerId) => {
      const startingTime = state.testTaker(testTakerId).deliveryStartingTime
      if (startingTime === null) {
        return null
      }
      return state.delivery.testDuration - (getters.currentTimestamp() - startingTime)
    },
    testTakerRemainingDurationString: (state, getters) => (testTakerId) => {
      const remainingDuration = getters.testTakerRemainingDuration(testTakerId)
      if (remainingDuration === null) {
        return 'inconnu'
      }
      return formatAsTimeString(remainingDuration)
    },
    remainingDurationBeforeClosingString: (state, getters) => () => {
      return formatAsTimeString(getters.currentTimestamp() - state.delivery.closingTime)
    },
    openingTimeString: (state, getters) => {
      return formatAsTimeString(state.delivery.openingTime)
    },
    closingTimeString: (state, getters) => {
      return formatAsTimeString(state.delivery.closingTime)
    },
    testDurationString: (state, getters) => {
      return formatAsTimeString(state.delivery.testDuration)
    },
    maxTestTakerRemainingDurationString: (state, getters) => () => {
      const remainingDurations = getters.sortedSupervisedTestTakerIds
        .map(testTakerId => getters.testTakerRemainingDuration(testTakerId))
        .filter(remainingDuration => remainingDuration !== null)
      if (remainingDurations.length === 0) {
        return 'inconnu'
      }
      return formatAsTimeString(Math.max(...remainingDurations))
    },
    nbDisconnected: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTaker(testTakerId).status === Vue.prototype.$status.DISCONNECTED).length
    },
    nbConnected: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTaker(testTakerId).status === Vue.prototype.$status.CONNECTED).length
    },
    nbInProgress: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTaker(testTakerId).status === Vue.prototype.$status.IN_PROGRESS).length
    },
    nbFinished: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTaker(testTakerId).status === Vue.prototype.$status.FINISHED).length
    },
    progressionString: (state, getters) => (testTakerId) => {
      const testTaker = state.testTaker(testTakerId)
      switch (testTaker.status) {
        case Vue.prototype.$status.DISCONNECTED:
          return 'inconnue'
        case Vue.prototype.$status.CONNECTED:
          return `0 / ${state.delivery.testNbQuestion}`
        case Vue.prototype.$status.IN_PROGRESS:
          return `${testTaker.questionNo} / ${state.delivery.testNbQuestion}`
        case Vue.prototype.$status.FINISHED:
          return 'terminé'
      }
    },
    averageProgressionString: (state, getters) => {
      const progresssions = []
      for (const testTakerId of getters.sortedSupervisedTestTakerIds) {
        const testTaker = state.testTaker(testTakerId)
        switch (testTaker.status) {
          case Vue.prototype.$status.DISCONNECTED:
            break
          case Vue.prototype.$status.CONNECTED:
            progresssions.push(0)
            break
          case Vue.prototype.$status.IN_PROGRESS:
            progresssions.push(testTaker.questionNo)
            break
          case Vue.prototype.$status.FINISHED:
            progresssions.push(state.delivery.testNbQuestion)
            break
        }
      }
      if (progresssions.length === 0) {
        return 'inconnue'
      }
      let averageProgression = Math.floor(progresssions.reduce((a, b) => a + b) / progresssions.length)
      if (averageProgression === state.delivery.testNbQuestion) {
        return 'terminé'
      }
      return `${averageProgression} / ${state.delivery.testNbQuestion}`
    },
    sortedSupervisedTestTakerIds: (state, getters) => {
      const supervisedTestTakerIds = state.testTakers.keys().filter(testTakerId => {
        const value = state.testTakerIdToTab.get(testTakerId)
        return value === Vue.prototype.$tab.SUPERVISED
      })
      return sortedTestTakerIds(supervisedTestTakerIds)
    },
    sortedUnsupervisedTestTakerIds: (state, getters) => {
      const supervisedTestTakerIds = state.testTakers.keys().filter(testTakerId => {
        const value = state.testTakerIdToTab.get(testTakerId)
        return value === Vue.prototype.$tab.UNSUPERVISED
      })
      return sortedTestTakerIds(supervisedTestTakerIds)
    }
  }
})

new Vue({
  render: createElt => createElt(App)
}).$mount('#app-container')
