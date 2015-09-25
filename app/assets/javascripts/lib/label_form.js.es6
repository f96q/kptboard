'use strict';

class LabelForm {
  constructor() {
    this.dialog = null;
    this.retrospectiveId = null;
    this.label = null;
  }

  labelFormTitle(typ) {
    switch (typ) {
      case 'keep':
        return 'Keep';
      break;

      case 'problem':
        return 'Problem';
      break;

      case 'try':
        return 'Try';
      break;
    }
    return null;
  }

  close() {
    React.unmountComponentAtNode(this.dialog[0]);
    this.dialog.remove();
    this.label = null;
  }

  save() {
    let description = this.dialog.find('.js-description').val();
    if (description == '') {
      return;
    }
    if (this.label.id) {
      labelActions.update(this.retrospectiveId, this.label.id, {typ: this.label.typ, description: description});
      this.close();
    } else {
      labelActions.create(this.retrospectiveId, {typ: this.label.typ, description: description});
      this.dialog.find('.js-description').val('');
    }
  }

  open(retrospectiveId, label, clientX, clientY) {
    if (this.dialog) {
      this.close();
    }
    this.retrospectiveId = retrospectiveId;
    this.label = label;
    this.dialog = $('<div></div>').dialog({
      title: this.labelFormTitle(label.typ),
      dialogClass: 'label-form__titlebar--' + label.typ,
      position: {my: 'left top', at: 'left+' + clientX + ' ' + 'top+' + clientY, of: window},
      close: this.close.bind(this),
      closeText: null,
      buttons: {save: this.save.bind(this)}
    });
    React.render(<LabelFormContent label={label} save={this.save.bind(this)} />, this.dialog[0]);
  }
}
