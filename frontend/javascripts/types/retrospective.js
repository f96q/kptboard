// @flow

import type { Labels } from './labels'
import type { Users } from './users'

export type Retrospective = {
  id: number,
  labels: {
    keep: Labels,
    problem: Labels,
    try: Labels
  },
  users: Users
}

export type RetrospectiveAction =
  { type: 'SET_RETROSPECTIVE', retrospective: Retrospective }
