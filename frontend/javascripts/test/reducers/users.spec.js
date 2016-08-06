import expect from 'expect'
import users from '../../reducers/users'
import * as types from '../../constants/ActionTypes'

describe('users', () => {
  const initialState = []

  it('should handle SET_RETROSPECTIVE action', () => {
    const action = {
      type: types.SET_RETROSPECTIVE,
      retrospective: {
        labels: {
          keep: [
            {
              id: 1,
              typ: 'keep',
              created_at: '08-01',
              user_name: 'name',
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
    const afterState = [
      {
        id: 1,
        name: 'name'
      }
    ]
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
    const afterState = [
      {
        id: 1,
        name: 'name'
      }
    ]
    expect(users(initialState, action)).toEqual(afterState)
  })

  it('should handle REMOVE_USER action', () => {
    const action = {
      type: types.REMOVE_USER,
      id: 1
    }
    const beforeState = [
      {
        id: 1,
        name: 'name'
      }
    ]
    expect(users(beforeState, action)).toEqual(initialState)
  })
})
