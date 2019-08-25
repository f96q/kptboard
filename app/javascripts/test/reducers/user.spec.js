import expect from 'expect'
import { setRetrospective } from '../../actionCreators/globalActions'
import {
  reducer,
  addUser,
  removeUser,
  setInvitationEmail
} from '../../reducers/user'

describe('user reducer', () => {
  const initialState = { users: [], email: '' }

  it('should handle setRetrospective action', () => {
    const retrospective = {
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
    const action = setRetrospective({ retrospective: retrospective })
    const afterState = {
      users: [{
        id: 1,
        name: 'name'
      }],
      email: ''
    }
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle addUser action', () => {
    const user = {
      id: 1,
      name: 'name'
    }
    const action = addUser({ user: user })
    const afterState =  {
      users: [{
        id: 1,
        name: 'name'
      }],
      email: ''
    }
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle removeUser action', () => {
    const action = removeUser({ id: 1 })
    const beforeState = {
      users: [{
        id: 1,
        name: 'name'
      }],
      email: ''
    }
    expect(reducer(beforeState, action)).toEqual(initialState)
  })
})
