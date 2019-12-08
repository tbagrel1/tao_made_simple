import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { tab, status } from '@/constants'
import App from '@/components/App'

import './globalStyle.styl'

const REFRESH_DELAY = 500

const formatAsDurationString = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toISOString().substr(11, 8)
}
const formatAsTimeString = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString()
}
const formatAsDateString = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString()
}
const sortedTestTakerIds = (originalTestTakerIds, testTakers) => {
  const testTakerIds = [...originalTestTakerIds]
  testTakerIds.sort((id1, id2) => {
    const testTaker1 = testTakers.get(id1)
    const testTaker2 = testTakers.get(id2)
    return testTaker1.lastname.localeCompare(testTaker2.lastname)
  })
  return testTakerIds
}

Vue.prototype.$refreshGetterValue = (self, name, params = []) => {
  const update = () => {
    self[name] = self.$store.getters[name](...params)
  }
  update()
  setInterval(update, REFRESH_DELAY)
}

Vue.prototype.$axios = axios

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
      openingTime: 1575391796,
      closingTime: 1575395796,
      testLabel: 'Test de mathématiques',
      testDuration: 3000,
      testNbQuestion: 12
    },
    testTakers: new Map([['i4456', {
      id: 'i4456',
      login: 'tchardon',
      firstname: 'Thibaut',
      lastname: 'CHARDON',
      status: status.IN_PROGRESS,
      deliveryStartingTime: 1575391896,
      testQuestionNo: 4
    }], ['i4457', {
      id: 'i4457',
      login: 'anevers',
      firstname: 'Alice',
      lastname: 'Nevers',
      status: status.CONNECTED,
      deliveryStartingTime: null,
      testQuestionNo: null
    }], ['i4458', {
      id: 'i4458',
      login: 'jadam',
      firstname: 'Jules',
      lastname: 'ADAM',
      status: status.FINISHED,
      deliveryStartingTime: 1575391886,
      testQuestionNo: null
    }], ['i5654', {
      id: 'i5654',
      login: 'sec118212',
      firstname: 'Compte Secours 111282',
      lastname: '',
      status: status.DISCONNECTED,
      deliveryStartingTime: null,
      testQuestionNo: null
    }], ['i4459', {
      id: 'i4459',
      login: 'jadam',
      firstname: 'Jules',
      lastname: 'ADAM',
      status: status.FINISHED,
      deliveryStartingTime: 1575391886,
      testQuestionNo: null
    }], ['i4460', {
      id: 'i4460',
      login: 'jadam',
      firstname: 'Jules',
      lastname: 'ADAM',
      status: status.FINISHED,
      deliveryStartingTime: 1575391886,
      testQuestionNo: null
    }], ['i4461', {
      id: 'i4461',
      login: 'jadam',
      firstname: 'Jules',
      lastname: 'ADAM',
      status: status.FINISHED,
      deliveryStartingTime: 1575391886,
      testQuestionNo: null
    }]]),
    testTakerIdToTab: new Map([
      ['i4456', tab.SUPERVISED],
      ['i4457', tab.SUPERVISED],
      ['i4458', tab.SUPERVISED],
      ['i4459', tab.SUPERVISED],
      ['i4460', tab.SUPERVISED],
      ['i4461', tab.SUPERVISED],
      ['i5654', tab.UNSUPERVISED]
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
            state.testTakerIdToTab = newTestTakerIdToTab.set(testTakerId, tab.UNSUPERVISED)
          } else {
            state.testTakerIdToTab = newTestTakerIdToTab.set(testTakerId, tab.SUPERVISED)
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
      const testTaker = state.testTakers.get(testTakerId)
      switch (testTaker.status) {
        case status.DISCONNECTED:
          return 'déconnecté'
        case status.CONNECTED:
          return 'connecté'
        case status.IN_PROGRESS:
          return 'en cours'
        case status.FINISHED:
          return 'terminé'
      }
    },
    fancyTestQuestionNo: (state, getters) => (testTakerId) => {
      const testTaker = state.testTakers.get(testTakerId)
      switch (testTaker.status) {
        case status.DISCONNECTED:
          return 0
        case status.CONNECTED:
          return 0
        case status.IN_PROGRESS:
          return testTaker.testQuestionNo
        case status.FINISHED:
          return state.delivery.testNbQuestion
      }
    },
    currentDateString: (state, getters) => () => {
      return formatAsDateString(getters.currentTimestamp())
    },
    currentTimeString: (state, getters) => () => {
      return formatAsTimeString(getters.currentTimestamp())
    },
    currentTimestamp: (state, getters) => () => {
      return new Date().getTime() / 1000
    },
    testTakerRemainingDuration: (state, getters) => (testTakerId) => {
      const startingTime = state.testTakers.get(testTakerId).deliveryStartingTime
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
      return formatAsDurationString(remainingDuration)
    },
    remainingDurationBeforeClosingString: (state, getters) => () => {
      return formatAsDurationString(state.delivery.closingTime - getters.currentTimestamp())
    },
    openingTimeString: (state, getters) => {
      return formatAsTimeString(state.delivery.openingTime)
    },
    closingTimeString: (state, getters) => {
      return formatAsTimeString(state.delivery.closingTime)
    },
    testDurationString: (state, getters) => {
      return formatAsDurationString(state.delivery.testDuration)
    },
    maxTestTakerRemainingDurationString: (state, getters) => () => {
      const remainingDurations = getters.sortedSupervisedTestTakerIds
        .map(testTakerId => getters.testTakerRemainingDuration(testTakerId))
        .filter(remainingDuration => remainingDuration !== null)
      if (remainingDurations.length === 0) {
        return 'inconnu'
      }
      return formatAsDurationString(Math.max(...remainingDurations))
    },
    nbDisconnected: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTakers.get(testTakerId).status === status.DISCONNECTED).length
    },
    nbConnected: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTakers.get(testTakerId).status === status.CONNECTED).length
    },
    nbInProgress: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTakers.get(testTakerId).status === status.IN_PROGRESS).length
    },
    nbFinished: (state, getters) => {
      return getters.sortedSupervisedTestTakerIds.filter(
        testTakerId => state.testTakers.get(testTakerId).status === status.FINISHED).length
    },
    progressionString: (state, getters) => (testTakerId) => {
      const testTaker = state.testTakers.get(testTakerId)
      switch (testTaker.status) {
        case status.DISCONNECTED:
          return 'inconnu'
        case status.CONNECTED:
          return `0 / ${state.delivery.testNbQuestion}`
        case status.IN_PROGRESS:
          return `${testTaker.testQuestionNo} / ${state.delivery.testNbQuestion}`
        case status.FINISHED:
          return 'terminé'
      }
    },
    averageProgressionString: (state, getters) => {
      const progressions = []
      for (const testTakerId of getters.sortedSupervisedTestTakerIds) {
        const testTaker = state.testTakers.get(testTakerId)
        switch (testTaker.status) {
          case status.DISCONNECTED:
            break
          case status.CONNECTED:
            progressions.push(0)
            break
          case status.IN_PROGRESS:
            progressions.push(testTaker.testQuestionNo)
            break
          case status.FINISHED:
            progressions.push(state.delivery.testNbQuestion)
            break
        }
      }
      if (progressions.length === 0) {
        return 'inconnue'
      }
      let averageProgression = Math.floor(progressions.reduce((a, b) => a + b) / progressions.length)
      if (averageProgression === state.delivery.testNbQuestion) {
        return 'terminé'
      }
      return `${averageProgression} / ${state.delivery.testNbQuestion}`
    },
    sortedSupervisedTestTakerIds: (state, getters) => {
      const supervisedTestTakerIds = Array.from(state.testTakers.keys()).filter(testTakerId => {
        const value = state.testTakerIdToTab.get(testTakerId)
        return value === tab.SUPERVISED
      })
      return sortedTestTakerIds(supervisedTestTakerIds, state.testTakers)
    },
    sortedUnsupervisedTestTakerIds: (state, getters) => {
      const unsupervisedTestTakerIds = Array.from(state.testTakers.keys()).filter(testTakerId => {
        const value = state.testTakerIdToTab.get(testTakerId)
        return value === tab.UNSUPERVISED
      })
      return sortedTestTakerIds(unsupervisedTestTakerIds, state.testTakers)
    }
  }
})

new Vue({
  render: createElt => createElt(App),
  store
}).$mount('#app-container')
