import { ActionCreator, buildActionCreator } from 'hard-reducer'

const { createAction } = buildActionCreator({
  prefix: 'global/'
})

type Retrospective = {

}

export const setRetrospective: ActionCreator<{
  retrospective: Retrospective
}> = createAction('set-retrospective')
