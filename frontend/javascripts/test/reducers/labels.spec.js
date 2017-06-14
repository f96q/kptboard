import expect from 'expect'
import labels from '../../reducers/labels'

describe('labels', () => {
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
        typ: null,
        description: ''
      }
    }
  }

  it('should handle SET_RETROSPECTIVE action', () => {
    const action = {
      type: 'SET_RETROSPECTIVE',
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
    const afterState = { ...initialState,
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
      }
    }
    expect(labels(initialState, action)).toEqual(afterState)
  })

  it('should handle OPEN_NEW_LABEL_MODAL action', () => {
    const action = {
      type: 'OPEN_NEW_LABEL_MODAL',
      clientX: 1,
      clientY: 1,
      typ: 'keep'
    }
    const afterState = { ...initialState,
      labelModal: {
        isOpen: true,
        clientX: 1,
        clientY: 1,
        label: {
          id: null,
          typ: 'keep',
          description: ''
        }
      }
    }
    expect(labels(initialState, action)).toEqual(afterState)
  })

  it('should handle OPEN_EDIT_LABEL_MODAL action', () => {
    const action = {
      type: 'OPEN_EDIT_LABEL_MODAL',
      clientX: 1,
      clientY: 1,
      id: 1
    }
    const beforeState = { ...initialState,
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
      }
    }
    const afterState = { ...initialState,
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
      labelModal: {
        isOpen: true,
        clientX: 1,
        clientY: 1,
        label: {
          id: 1,
          typ: 'keep',
          description: 'description'
        }
      }
    }
    expect(labels(beforeState, action)).toEqual(afterState)
  })

  it('should handle CLOSE_LABEL_MODAL action', () => {
    const action = {
      type: 'CLOSE_LABEL_MODAL'
    }
    const beforeState = { ...initialState,
      labelModal: {
        isOpen: true,
        clientX: 0,
        clientY: 0,
        label: {
          id: null,
          typ: null,
          description: 'update description'
        }
      }
    }
    expect(labels(beforeState, action)).toEqual(initialState)
  })

  it('should handle UPDATE_LABEL_MODAL action', () => {
    const action = {
      type: 'UPDATE_LABEL_MODAL',
      description: 'update description'
    }
    const afterState = { ...initialState,
      labelModal: {
        isOpen: false,
        clientX: 0,
        clientY: 0,
        label: {
          id: null,
          typ: null,
          description: 'update description'
        }
      }
    }
    expect(labels(initialState, action)).toEqual(afterState)
  })

  it('should handle CREATE_LABEL action', () => {
    const action = {
      type: 'CREATE_LABEL',
      label: {
        id: 1,
        typ: 'keep',
        createdAt: '08-01',
        userName: 'name',
        description: 'description'
      }
    }
    const afterState = { ...initialState,
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
      }
    }
    expect(labels(initialState, action)).toEqual(afterState)
  })

  it('should handle UPDATE_LABEL action', () => {
    const action = {
      type: 'UPDATE_LABEL',
      id: 1,
      label: {
        description: 'update description'
      }
    }
    const beforeState = { ...initialState,
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
      }
    }
    const afterState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            typ: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'update description'
          }
        ],
        problem: [],
        try: []
      }
    }
    expect(labels(beforeState, action)).toEqual(afterState)
  })

  it('should handle DESTROY_LABEL action', () => {
    const action = {
      type: 'DESTROY_LABEL',
      id: 1
    }
    const beforeState = { ...initialState,
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
      }
    }
    expect(labels(beforeState, action)).toEqual(initialState)
  })

  it('should handle DRAG_START_LABEL action', () => {
    const action = {
      type: 'DRAG_START_LABEL',
      id: 1
    }
    const afterState = { ...initialState, dragStartId: 1 }
    expect(labels(initialState, action)).toEqual(afterState)
  })

  it('should handle DRAG_END_LABEL action', () => {
    const action = {
      type: 'DRAG_END_LABEL'
    }
    const beforeState = { ...initialState, dragStartId: 1 }
    expect(labels(beforeState, action)).toEqual(initialState)
  })

  it('should handle DROP_LABEL action', () => {
    const action = {
      type: 'DROP_LABEL',
      id: 1,
      typ: 'keep',
      index: 2
    }
    const beforeState = { ...initialState,
      labels: {
        keep: [
          {
            id: 1,
            typ: 'keep',
            createdAt: '08-01',
            userName: 'name',
            description: 'description'
          },
          {
            id: 2,
            typ: 'keep',
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
            typ: 'keep',
            createdAt: '08-02',
            userName: 'name',
            description: 'description'
          },
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
      }
    }
    expect(labels(beforeState, action)).toEqual(afterState)
  })

  describe('when other type drop', () => {
    it('should handle DROP_LABEL action', () => {
      const action = {
        type: 'DROP_LABEL',
        id: 1,
        typ: 'problem',
        index: 2
      }
      const beforeState = { ...initialState,
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
          problem: [
            {
              id: 2,
              typ: 'problem',
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
              typ: 'problem',
              createdAt: '08-02',
              userName: 'name',
              description: 'description'
            },
            {
              id: 1,
              typ: 'problem',
              createdAt: '08-01',
              userName: 'name',
              description: 'description'
            }
          ],
          try: []
        }
      }
      expect(labels(beforeState, action)).toEqual(afterState)
    })
  })
})
