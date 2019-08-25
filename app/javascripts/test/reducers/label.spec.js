import expect from 'expect'
import { setRetrospective } from '../../actionCreators/globalActions'
import {
  reducer,
  openNewLabelModal,
  openEditLabelModal,
  updateLabelModal,
  closeLabelModal,
  createLabel,
  updateLabel,
  destroyLabel,
  dragStartLabel,
  dragEndLabel,
  dropLabel
} from '../../reducers/label'

describe('label reducer', () => {
  const initialState = {
    dragStartId: null,
    labels: {
      keep: [],
      problem: [],
      try: []
    },
    labelModal: {
      isOpen: false,
      clientX: 0,
      clientY: 0,
      label: {
        id: null,
        kind: null,
        description: ''
      }
    }
  }

  it('should handle setRetrospective action', () => {
    const retrospective = {
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
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
    const afterState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle openNewLabelModal action', () => {
    const afterState = { ...initialState,
      labelModal: {
        isOpen: true,
        clientX: 1,
        clientY: 1,
        label: {
          id: null,
          kind: 'keep',
          description: ''
        }
      }
    }
    const action = openNewLabelModal({ kind: 'keep', clientX: 1, clientY: 1 })
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle openEditLabelModal action', () => {
    const action = openEditLabelModal({ id: 1, clientX: 1, clientY: 1 })
    const beforeState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    const afterState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      },
      labelModal: {
        isOpen: true,
        clientX: 1,
        clientY: 1,
        label: {
          id: 1,
          kind: 'keep',
          description: 'description'
        }
      }
    }
    expect(reducer(beforeState, action)).toEqual(afterState)
  })

  it('should handle closeLabelModal action', () => {
    const action = closeLabelModal()
    const beforeState = { ...initialState,
      labelModal: {
        isOpen: true,
        clientX: 0,
        clientY: 0,
        label: {
          id: null,
          kind: null,
          description: 'update description'
        }
      }
    }
    expect(reducer(beforeState, action)).toEqual(initialState)
  })

  it('should handle updateLabelModal action', () => {
    const action = updateLabelModal({ description: 'update description' })
    const afterState = { ...initialState,
      labelModal: {
        isOpen: false,
        clientX: 0,
        clientY: 0,
        label: {
          id: null,
          kind: null,
          description: 'update description'
        }
      }
    }
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle createLabel action', () => {
    const label = {
      id: 1,
      kind: 'keep',
      createdAt: '08-01',
      userName: 'name',
      description: 'description'
    }
    const action = createLabel({ label: label })
    const afterState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle updateLabel action', () => {
    const action = updateLabel({ id: 1, label: { description: 'update description' } })
    const beforeState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    const afterState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'update description'
          }
        ],
        problem: [],
        try: []
      }
    }
    expect(reducer(beforeState, action)).toEqual(afterState)
  })

  it('should handle destroyLabel action', () => {
    const action = destroyLabel({ id: 1 })
    const beforeState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    expect(reducer(beforeState, action)).toEqual(initialState)
  })

  it('should handle dragStartLabel action', () => {
    const action = dragStartLabel({ id: 1 })
    const afterState = { ...initialState, dragStartId: 1 }
    expect(reducer(initialState, action)).toEqual(afterState)
  })

  it('should handle dragEndLabel action', () => {
    const action = dragEndLabel()
    const beforeState = { ...initialState, dragStartId: 1 }
    expect(reducer(beforeState, action)).toEqual(initialState)
  })

  it('should handle dropLabel action', () => {
    const action = dropLabel({ id: 1, kind: 'keep', index: 2 })
    const beforeState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          },
          {
            id: 2,
            kind: 'keep',
            createdAt: '08-02',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    const afterState = { ...initialState,
      labels: {
        keep: [
          {
            id: 2,
            kind: 'keep',
            createdAt: '08-02',
            userName: 'name',
            description: 'description'
          },
          {
            id: 1,
            kind: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          }
        ],
        problem: [],
        try: []
      }
    }
    expect(reducer(beforeState, action)).toEqual(afterState)
  })

  describe('when other kind drop', () => {
    it('should handle dropLabel action', () => {
      const action = dropLabel({ id: 1, kind: 'problem', index: 2 })
      const beforeState = { ...initialState,
        labels: {
          keep: [
            {
              id: 1,
              kind: 'keep',
              createdAt: '08-01',
              userName: 'name',
              description: 'description'
            }
          ],
          problem: [
            {
              id: 2,
              kind: 'problem',
              createdAt: '08-02',
              userName: 'name',
              description: 'description'
            }
          ],
          try: []
        }
      }
      const afterState = { ...initialState,
        labels: {
          keep: [],
          problem: [
            {
              id: 2,
              kind: 'problem',
              createdAt: '08-02',
              userName: 'name',
              description: 'description'
            },
            {
              id: 1,
              kind: 'problem',
              createdAt: '08-01',
              userName: 'name',
              description: 'description'
            }
          ],
          try: []
        }
      }
      expect(reducer(beforeState, action)).toEqual(afterState)
    })
  })
})

