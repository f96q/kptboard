'use strict';

class LabelStore extends FluxStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.labelForm = new LabelForm();
  }

  getInitialState() {
    return {
      dragStartId: null,
      labels: {
        keep: [],
        problem: [],
        try: []
      }
    };
  }

  getDragStatId() {
    return this.state.dragStartId;
  }

  getLabels() {
    return this.state.labels;
  }

  invokeOnDispatch(action) {
    switch (action.type) {
      case LabelConstants.SET_LABELS:
        Object.assign(this.state.labels, action.labels);
        this.emitChange();
      break;

      case LabelConstants.OPEN_DIALOG: {
        let label = null;
        if (action.label.id) {
          let position = this.find(action.label.id);
          label = this.state.labels[position.typ][position.index];
        } else {
          label = {typ: action.label.typ, description: null};
        }
        this.labelForm.open(action.retrospectiveId, label, action.clientX, action.clientY);
      }
      break;

      case LabelConstants.CREATE:
        this.create(action.label);
        this.emitChange();
      break;

      case LabelConstants.UPDATE:
        this.update(action.id, action.label);
        this.emitChange();
      break;

      case LabelConstants.DESTROY:
        this.destroy(action.id);
        this.emitChange();
      break;

      case LabelConstants.DRAG_START:
        this.state.dragStartId = action.id;
        this.emitChange();
      break;

      case LabelConstants.DRAG_END:
        this.state.dragStartId = null;
        this.emitChange();
      break;

      case LabelConstants.DROP:
        this.drop(action.id, action.typ, action.index);
        this.emitChange();
      break;
    }
  }

  find(id) {
    for (let typ of ['keep', 'problem', 'try']) {
      for (let i in this.state.labels[typ]) {
        let label = this.state.labels[typ][i];
        if (label.id == id) {
          return {typ: typ, index: parseInt(i)};
        }
      }
    }
    return null;
  }

  create(label) {
    this.state.labels[label.typ].unshift(label);
  }

  update(id, label) {
    let position = this.find(id);
    this.state.labels[position.typ][position.index].description = label.description;
  }

  destroy(id) {
    let position = this.find(id);
    this.state.labels[position.typ].splice(position.index, 1);
  }

  drop(id, typ, index) {
    let label = {};
    let from = this.find(id);
    Object.assign(label, this.state.labels[from.typ][from.index]);
    this.state.labels[from.typ].splice(from.index, 1);
    if (label.typ != typ) {
      label.typ = typ;
    }
    this.state.labels[typ].splice(index, 0, label);
  }
}
