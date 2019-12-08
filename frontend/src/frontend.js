import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { tab, status, refreshStatus } from '@/constants'
import App from '@/components/App'
import config from './config'

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
const makeApiUrl = (target) => {
  return `${config.API_ROOT_URL}/${target}`
}

Vue.prototype.$refreshGetterValue = (self, name, params = []) => {
  const refresh = () => {
    self[name] = self.$store.getters[name](...params)
  }
  refresh()
  setInterval(refresh, REFRESH_DELAY)
}

const repeatAction = async (dispatch, name) => {
  const refresh = async () => {
    await dispatch(name)
  }
  await refresh()
  setInterval(refresh, REFRESH_DELAY)
}

Vue.prototype.$axios = axios

Vue.use(Vuex)
Vue.use(BootstrapVue)

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    deliveryId: null,
    refreshDeliveriesStatus: refreshStatus.NEVER_DONE,
    refreshTestTakersStatus: refreshStatus.NEVER_DONE,
    deliveries: new Map(),
    testTakers: new Map(),
    testTakerIdToTab: new Map()
  },
  actions: {
    refreshDeliveries: async ({ commit, state }) => {
      if (state.refreshDeliveriesStatus !== refreshStatus.SUCCESS) {
        commit('setRefreshDeliveriesStatus', refreshStatus.IN_PROGRESS)
      }
      await axios.get(makeApiUrl('delivery'))
        .then((response) => {
          const deliveries = response.data.deliveries
          commit('setDeliveries', deliveries)
          commit('setRefreshDeliveriesStatus', refreshStatus.SUCCESS)
        })
        .catch(() => {
          commit('setDeliveries', new Map())
          commit('setRefreshDeliveriesStatus', refreshStatus.ERROR)
        })
    },
    refreshTestTakers: async ({ commit, state }) => {
      if (state.deliveryId === null) {
        return
      }
      if (state.refreshTestTakersStatus !== refreshStatus.SUCCESS) {
        commit('setRefreshTestTakersStatus', refreshStatus.IN_PROGRESS)
      }
      axios.get(makeApiUrl(`delivery/${state.deliveryId}/testTaker`))
        .then((response) => {
          const testTakers = response.data.testTakers
          commit('setTestTakers', testTakers)
          commit('addToDefaultTab')
          commit('setRefreshTestTakersStatus', refreshStatus.SUCCESS)
        })
        .catch(() => {
          commit('setTestTakers', new Map())
          commit('setRefreshTestTakersStatus', refreshStatus.ERROR)
        })
    },
    chooseDelivery: async ({ commit, dispatch }, deliveryId) => {
      commit('setDeliveryId', deliveryId)
      await repeatAction(dispatch, 'refreshTestTakers')
    }
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
    },
    setDeliveryId: (state, deliveryId) => {
      state.deliveryId = deliveryId
    },
    setDeliveries: (state, deliveries) => {
      state.deliveries = new Map(deliveries.map(delivery => [delivery.id, delivery]))
    },
    setTestTakers: (state, testTakers) => {
      state.testTakers = new Map(testTakers.map(testTaker => [testTaker.id, testTaker]))
    },
    setRefreshTestTakersStatus: (state, newRefreshStatus) => {
      state.refreshTestTakersStatus = newRefreshStatus
    },
    setRefreshDeliveriesStatus: (state, newRefreshStatus) => {
      state.refreshDeliveriesStatus = newRefreshStatus
    }
  },
  getters: {
    isRefreshError: (state, getters) => {
      return state.refreshTestTakersStatus === refreshStatus.ERROR || state.refreshDeliveriesStatus === refreshStatus.ERROR
    },
    isRefreshInProgress: (state, getters) => {
      return !getters.isRefreshError && (state.refreshTestTakersStatus === refreshStatus.IN_PROGRESS || state.refreshDeliveriesStatus === refreshStatus.IN_PROGRESS || state.refreshDeliveriesStatus === refreshStatus.NEVER_DONE)
    },
    isDeliverySelected: (state, getters) => {
      return state.deliveryId !== null
    },
    testTaker: (state, getters) => (testTakerId) => {
      return state.testTakers.get(testTakerId)
    },
    delivery: (state, getters) => {
      return state.deliveries.get(state.deliveryId)
    },
    deliveries: (state, getters) => {
      return Array.from(state.deliveries.values())
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
          return getters.delivery.testNbQuestion
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
      return getters.delivery.testDuration - (getters.currentTimestamp() - startingTime)
    },
    testTakerRemainingDurationString: (state, getters) => (testTakerId) => {
      const remainingDuration = getters.testTakerRemainingDuration(testTakerId)
      if (remainingDuration === null) {
        return 'inconnu'
      }
      return formatAsDurationString(remainingDuration)
    },
    remainingDurationBeforeClosingString: (state, getters) => () => {
      return formatAsDurationString(getters.delivery.closingTime - getters.currentTimestamp())
    },
    openingTimeString: (state, getters) => {
      return formatAsTimeString(getters.delivery.openingTime)
    },
    closingTimeString: (state, getters) => {
      return formatAsTimeString(getters.delivery.closingTime)
    },
    testDurationString: (state, getters) => {
      return formatAsDurationString(getters.delivery.testDuration)
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
          return `0 / ${getters.delivery.testNbQuestion}`
        case status.IN_PROGRESS:
          return `${testTaker.testQuestionNo} / ${getters.delivery.testNbQuestion}`
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
            progressions.push(getters.delivery.testNbQuestion)
            break
        }
      }
      if (progressions.length === 0) {
        return 'inconnue'
      }
      let averageProgression = Math.floor(progressions.reduce((a, b) => a + b) / progressions.length)
      if (averageProgression === getters.delivery.testNbQuestion) {
        return 'terminé'
      }
      return `${averageProgression} / ${getters.delivery.testNbQuestion}`
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
