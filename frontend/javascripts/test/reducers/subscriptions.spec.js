import expect from 'expect'
import subscriptions from '../../reducers/subscriptions'
import * as types from '../../constants/ActionTypes'

describe('subscriptions', () => {
  const initialState = {
    retrospectives: null,
    retrospectivesUsers: null,
    labels: null,
  }

  it('should handle SET_SUBSCRIPTIONS action', () => {
    const action = {
      type: types.SET_SUBSCRIPTIONS,
      subscriptions: { retrospectives: {}, retrospectivesUsers: {}, labels: {} }
    }
    const afterState = {
      retrospectives: {},
      retrospectivesUsers: {},
      labels: {}
    }
    expect(subscriptions(initialState, action)).toEqual(afterState)
  })
})
