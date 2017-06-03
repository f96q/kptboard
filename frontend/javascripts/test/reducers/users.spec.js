import expect from 'expect'
import users from '../../reducers/users'
import * as types from '../../constants/ActionTypes'

describe('users', () => {
  const initialState = { users: [], email: '' }

  it('should handle SET_RETROSPECTIVE action', () => {
    const action = {
      type: types.SET_RETROSPECTIVE,
      retrospective: {
        labels: {
          keep: [
            {
              id: 1,
              typ: 'keep',
              createdAt: '08-01',
              userName: 'name',
              description: 'description'
            }
          ],
          problem: [],
          try: []
        },
        users: [
          {
            id: 1,
            name: 'name'
          }
        ]
      }
    }
    const afterState = {
      users: [{
        id: 1,
        name: 'name'
      }],
      email: ''
    }
    expect(users(initialState, action)).toEqual(afterState)
  })

  it('should handle ADD_USER action', () => {
    const action = {
      type: types.ADD_USER,
      user: {
        id: 1,
        name: 'name'
      }
    }
    const afterState =  {
      users: [{
        id: 1,
        name: 'name'
      }],
      email: ''
    }
    expect(users(initialState, action)).toEqual(afterState)
  })

  it('should handle REMOVE_USER action', () => {
    const action = {
      type: types.REMOVE_USER,
      id: 1
    }
    const beforeState = {
      users: [{
        id: 1,
        name: 'name'
      }],
      email: ''
    }
    expect(users(beforeState, action)).toEqual(initialState)
  })
})
