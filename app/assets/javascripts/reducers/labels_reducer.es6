(function() {

let labelForm = new app.LabelForm();

function findLabelPosition(labels, id) {
  for (let typ of ['keep', 'problem', 'try']) {
    for (let i in labels[typ]) {
      let label = labels[typ][i];
      if (label.id == id) {
        return {typ: typ, index: parseInt(i)};
      }
    }
  }
  return null;
}

const initialState = {
  dragStartId: null,
  labels: {keep: [], problem: [], try: []}
};

app.labelsReducer =

function labelsReducer(state = initialState, action) {
  switch (action.type) {
    case app.ActionTypes.SET_RETROSPECTIVE: {
      return Object.assign({}, state, {labels: action.retrospective.labels});
    }
    break;

    case app.ActionTypes.OPEN_DIALOG_LABEL: {
      let label = null;
      if (action.label.id) {
        let position = findLabelPosition(state.labels, action.label.id);
        label = state.labels[position.typ][position.index];
      } else {
        label = {typ: action.label.typ, description: null};
      }
      labelForm.open(label, action.clientX, action.clientY, action.actions);
      return state;
    }
    break;

    case app.ActionTypes.CREATE_LABEL: {
      let labels = Object.assign({}, state.labels);
      labels[action.label.typ] = [action.label, ...state.labels[action.label.typ]];
      return Object.assign({}, state, {labels: labels});
    }
    break;

    case app.ActionTypes.UPDATE_LABEL: {
      let labels = Object.assign({}, state.labels);
      let position = findLabelPosition(labels, action.id);
      labels[position.typ][position.index].description = action.label.description;
      return Object.assign({}, state, {labels: labels});
    }
    break;

    case app.ActionTypes.DESTROY_LABEL: {
      let labels = Object.assign({}, state.labels);
      let position = findLabelPosition(labels, action.id);
      labels[position.typ].splice(position.index, 1);
      return Object.assign({}, state, {labels: labels});
    }
    break;

    case app.ActionTypes.DRAG_START_LABEL:
      return Object.assign({}, state, {dragStartId: action.id});
    break;

    case app.ActionTypes.DRAG_END_LABEL:
      return Object.assign({}, state, {dragStartId: null});
    break;

    case app.ActionTypes.DROP_LABEL: {
      let labels = Object.assign({}, state.labels);
      let from = findLabelPosition(labels, action.id);
      let label = Object.assign({}, labels[from.typ][from.index]);
      labels[from.typ].splice(from.index, 1);
      if (label.typ != action.typ) {
        label.typ = action.typ;
      }
      labels[action.typ].splice(action.index, 0, label);
      return Object.assign({}, state, {labels: labels});
    }
    break;
  }
  return state;
}

})();
