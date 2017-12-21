// @flow

export type Alert = {
  type: ?string,
  messages: Array<string>
}

export type ApplicationState = {
  alert: Alert
}

export type ApplicationAction =
  | { type: 'CLEAR_ALERT' }
  | { type: 'SET_ALERT', alert: Alert }
