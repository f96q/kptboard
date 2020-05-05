import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../actionCreators'

export const Alert = (props) => {
  const { alert } = useSelector(state => ({
    alert: state.app.alert
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    if (alert.messages.length == 0) {
      return
    }
    setTimeout(() => dispatch(actions.app.clearAlert({})), 5000)
  }, [])

  if (alert.messages.length == 0 || alert.type == null) {
    return null
  }
  return (
    <div className={`Alert is-${alert.type}`}>
      <div className="Alert-messages">{alert.messages.map((message, i) => (<div key={`message-${i + 1}`} className="Alert-message">{message}</div>))}</div>
    </div>
  )
}
