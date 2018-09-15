export const clearAlert = ({ setAlert }) => () => {
  const alert = {
    type: null,
    messages: []
  }
  setAlert(alert)
}
