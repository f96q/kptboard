import React from 'react'
import styled from 'styled-components'

export default props => {
  const {
    label,
    openEditLabelModal,
    destroyLabel,
    dragStartLabel,
    dragEndLabel
  } = props
  return (
    <Container
      onClick={event => {
        openEditLabelModal(label.id, event.clientX, event.clientY)
        event.stopPropagation()
      }}
      draggable="true"
      onDragStart={event => dragStartLabel(label.id)}
      onDragEnd={event => dragEndLabel()}>
      <Content>
        <Header>
          <Remove
            className="fa fa-remove"
            data-test="remove"
            onClick={event => dragStartLabel(label.id)}></Remove>
          <CreatedAt data-test="created-at">{label.createdAt}</CreatedAt>
          <UserName data-test="user-name">{label.userName}</UserName>
        </Header>
        <Description data-test="description">{label.description}</Description>
     </Content>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 10px 6px -6px black;
  height: 150px;
  width: 150px;
  background: linear-gradient(to bottom, #fefeb6 0%, #d6d37c 100%);
`

const Content = styled.div`
  margin: 8px;
`

const Header = styled.div`
  color: $color-gray;
  display: flex;
  font-size: .6rem;
  font-weight: bold;
`

const Remove = styled.i`
  font-size: 1rem;
`

const CreatedAt = styled.div`
  margin-left: 5px;
  margin-top: 2px;
`

const UserName = styled.div`
  margin-left: 5px;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70px;
`

const Description = styled.div`
  font-size: .8rem;
  font-weight: bold;
  height: 110px;
  overflow: hidden;
`
