import { ActionCreator, buildActionCreator } from 'hard-reducer'

const { createAction } = buildActionCreator({
  prefix: 'global/'
})

export const setRetrospective = createAction('set-retrospective')
