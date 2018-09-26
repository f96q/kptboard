import React from 'react'
import styled from 'styled-components'

const removeButton = props => {
  const { user, removeUser } = props
  return (
    <Remove className="fa fa-remove"
      data-test="remove"
      onClick={() => {
        if (window.confirm(`remove user ${user.name}`)) {
           removeUser(user.id)
         }
       }}
    />
  )
}

export default props => {
  const { user, removeUser, isDestroy } = props
  return (
    <Container>
      <div className="fa fa-user">
      <Name data-test="name">{user.name}</Name>
      </div>
      {isDestroy ? removeButton(props) : null}
    </Container>
  )
}

const Container = styled.div`
  color: $color-orange;
  font-size: $font-size-xx-small;
  font-weight: bold;
`

const Name = styled.div`
  display: inline-block;
  margin-left: 2px;
`

const RemoveButton = styled.div`
  margin-top: 6px;
`

const Remove = styled.i`
  margin-left: 5px;
`
