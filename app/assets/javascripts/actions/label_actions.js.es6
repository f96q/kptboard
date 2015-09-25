'use strict';

class LabelActions extends FluxActions {
  constructor(dispatcher) {
    super(dispatcher);
  }

  setLabels(labels) {
    this.dispatch({
      type: LabelConstants.SET_LABELS,
      labels: labels
    });
  }

  openDialog(retrospectiveId, label, clientX, clientY) {
    this.dispatch({
      type: LabelConstants.OPEN_DIALOG,
      clientX: clientX,
      clientY: clientY,
      retrospectiveId: retrospectiveId,
      label: label
    });
  }

  create(retrospectiveId, label) {
    webSocketUtils.trigger('labels.create', {retrospective_id: retrospectiveId, label: label});
  }

  _create(label) {
    this.dispatch({
      type: LabelConstants.CREATE,
      label: label
    });
  }

  update(retrospectiveId, id, label) {
    webSocketUtils.trigger('labels.update', {retrospective_id: retrospectiveId, id: id, label: label});
  }

  _update(id, label) {
    this.dispatch({
      type: LabelConstants.UPDATE,
      id: id,
      label: label
    });
  }

  destroy(retrospectiveId, id) {
    webSocketUtils.trigger('labels.destroy', {retrospective_id: retrospectiveId, id: id});
  }

  _destroy(id) {
    this.dispatch({
      type: LabelConstants.DESTROY,
      id: id
    });
  }

  dragStart(id) {
    this.dispatch({
      type: LabelConstants.DRAG_START,
      id: id
    });
  }

  dragEnd() {
    this.dispatch({
      type: LabelConstants.DRAG_END
    });
  }

  drop(retrospectiveId, id, typ, index) {
    webSocketUtils.trigger('labels.update_position', {retrospective_id: retrospectiveId, id: id, typ: typ, position: index + 1});
  }

  _drop(id, typ, index) {
    this.dispatch({
      type: LabelConstants.DROP,
      id: id,
      typ: typ,
      index: index
    });
  }
}
