import expect from 'expect'
import subscriptions from '../../reducers/subscriptions'
import * as types from '../../constants/ActionTypes'

describe('subscriptions', () => {
  const initialState = {
    retrospectives: null,
    labels: null
  }

  it('should handle SET_SUBSCRIPTIONS action', () => {
    const action = {
      type: types.SET_SUBSCRIPTIONS,
      subscriptions: { retrospectives: {}, labels: {} }
    }
    const afterState = {
      retrospectives: {},
      labels: {}
    }
    expect(subscriptions(initialState, action)).toEqual(afterState)
  })
})
