import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/components/App'

import './globalStyle.styl'

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

Vue.use(Vuex)
Vue.use(BootstrapVue)

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    delivery: null,
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
    testTakers: new Map(
      /* id: String -> {
       id: String,
       login: String,
       firstname: String,
       lastname: String,
       status: String in ['disconnected', 'connected', 'inProgress', 'finished'],
       deliveryStartingTime: Number,
       testQuestionNo: Number
       } */
    ),
    testTakerIdToTab: new Map(
      /*
       id: String -> tabId: Number in [0, 1]
       */
    )
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
    currentDateString: (state) => {
      return formatAsDateString(new Date())
    },
    currentTimestamp: (state) => {
      return new Date().getTime() / 1000
    },
    remainingDurationForTestTaker: (state, getters) => testTakerId => {
      const startingTime = state.testTakers.get(testTakerId).deliveryStartingTime
      if (startingTime === null) {
        return null
      }
      return state.delivery.testDuration - (getters.currentTimestamp() - startingTime)
    },
    remainingDurationForTestTakerAsTimeString: (state, getters) => testTakerId => {
      const remainingDuration = getters.remainingDuration(testTakerId)
      if (remainingDuration === null) {
        return 'inconnu'
      }
      return formatAsTimeString(remainingDuration)
    },
    remainingDurationBeforeClosingAsTimeString: (state, getters) => {
      return formatAsTimeString(getters.currentTimestamp() - state.delivery.closingTime)
    },
    testDurationAsTimeString: (state) => {
      return formatAsTimeString(state.delivery.testDuration)
    },
    maxRemainingDurationForTestTakers: (state, getters) => {
      const remainingDurations = getters.sortedSupervisedTestTakerIds()
        .map(testTakerId => getters.remainingDurationForTestTaker(testTakerId))
        .filter(remainingDuration => remainingDuration !== null)
      if (remainingDurations.length === 0) {
        return 'inconnu'
      }
      return Math.max(...remainingDurations)
    },
    maxRemainingDurationForTestTakersAsTimeString: (state, getters) => {
      return formatAsTimeString(getters.maxRemainingDurationForTestTakers())
    },
    nbDisconnected: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds().filter(
        testTakerId => state.testTakers.get(testTakerId).status === Vue.prototype.$status.DISCONNECTED).length
    },
    nbConnected: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds().filter(
        testTakerId => state.testTakers.get(testTakerId).status === Vue.prototype.$status.CONNECTED).length
    },
    nbInProgress: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds().filter(
        testTakerId => state.testTakers.get(testTakerId).status === Vue.prototype.$status.IN_PROGRESS).length
    },
    nbFinished: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds().filter(
        testTakerId => state.testTakers.get(testTakerId).status === Vue.prototype.$status.FINISHED).length
    },
    progressionString: (state) => (testTakerId) => {
      const testTaker = state.testTakers.get(testTakerId)
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
      for (const testTakerId of getters.sortedSupervisedTestTakerIds()) {
        const testTaker = state.testTakers.get(testTakerId)
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
    sortedSupervisedTestTakerIds: (state) => {
      const supervisedTestTakerIds = state.testTakers.keys().filter(testTakerId => {
        const value = state.testTakerIdToTab.get(testTakerId)
        return value === Vue.prototype.$tab.SUPERVISED
      })
      return sortedTestTakerIds(supervisedTestTakerIds)
    },
    sortedUnsupervisedTestTakerIds: (state) => {
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
