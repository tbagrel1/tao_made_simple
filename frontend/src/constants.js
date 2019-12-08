const tab = {
  SUPERVISED: 0,
  UNSUPERVISED: 1
}

const status = {
  DISCONNECTED: 'disconnected',
  CONNECTED: 'connected',
  IN_PROGRESS: 'inProgress',
  FINISHED: 'finished'
}

const refreshStatus = {
  NEVER_DONE: 'neverDone',
  IN_PROGRESS: 'inProgress',
  ERROR: 'error',
  SUCCESS: 'success'
}

export {
  tab,
  status,
  refreshStatus
}
