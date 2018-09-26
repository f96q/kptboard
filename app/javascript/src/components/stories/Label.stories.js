import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Label from '../Label'

const getLabel = (kind) => ({
  id: 1,
  kind: kind,
  createdAt: '08-01',
  userName: 'name',
  description: 'description'
})

storiesOf('Label', module)
  .add('label', () => <Label label={getLabel('keep')} />)
