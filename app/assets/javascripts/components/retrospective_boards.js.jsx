'use strict';

class RetrospectiveBoards extends React.Component {
  constructor() {
    super();
    this.dragStartId = null;
    this.state = {
      keepLabels: [],
      problemLabels: [],
      tryLabels: [],
      users: []
    };
  }

  labelFormTitle(label) {
    switch (label.typ) {
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

  openLabelForm(event, label) {
    let self = this;

    if (self.dialog) {
      React.unmountComponentAtNode(self.dialog[0]);
      self.dialog.remove();
    }

    let save = () => {
      let description = self.dialog.find('.js-description').val();
      if (description == '') {
        return;
      }
      label.description = description
      if (label.id) {
        self.update(label);
      } else {
        self.create(label);
      }
    }

    let close = (event) => {
      React.unmountComponentAtNode(event.target);
      jQuery(event.target).remove();
    }

    let onKeyDown = (event) => {
      if (event.keyCode == 13) {
        save();
      }
    }

    self.dialog = jQuery('<div></div>').dialog({
      title: self.labelFormTitle(label),
      dialogClass: 'label-form__titlebar--' + label.typ,
      position: {my: 'left top', at: 'left+' + event.clientX + ' ' + 'top+' + event.clientY, of: window},
      close: close,
      closeText: null,
      buttons: {save: save}
    });

    React.render(
      <div className="retrospective__label-form" data-typ={label.typ} data-id={label.id}>
        <textarea className="js-description" rows="10" defaultValue={label.description} onKeyDown={onKeyDown}></textarea>
      </div>, this.dialog[0]
    );
  }

  new(event) {
    let typ = jQuery(event.target).closest('.js-board').data('typ');
    this.openLabelForm(event, {typ: typ});
  }

  edit(event, id) {
    let label = this.findLabel(id);
    this.openLabelForm(event, label);
  }

  create(label) {
    this.dispatcher.trigger('labels.create', {retrospective_id: this.props.id, label: label});
  }

  update(label) {
    this.dispatcher.trigger('labels.update', {retrospective_id: this.props.id, id: label.id, label: {description: label.description}});
  }

  destroy(id) {
    this.dispatcher.trigger('labels.destroy', {retrospective_id: this.props.id, id: id});
  }

  addUser(email) {
    this.dispatcher.trigger('retrospectives.add_user', {retrospective_id: this.props.id, email: email});
  }

  initWebSocket(id, url) {
    let self = this;
    this.dispatcher = new WebSocketRails(url);
    this.dispatcher.channel = this.dispatcher.subscribe('retrospective-' + id);
    this.dispatcher.on_open = (data) => {
      self.dispatcher.trigger('retrospectives.open', {retrospective_id: id}, (data) => {
        self.state.users = data.users
        data.labels.map((label) => {
          self.state[label.typ + 'Labels'].push(label);
        });
        self.setState(self.state);
      });
    }
    this.dispatcher.channel.bind('labels.create', (label) => {
      let name = label.typ + 'Labels';
      let state = {};
      self.state[name].unshift(label);
      state[name] = self.state[name];
      self.setState(state);
    });
    this.dispatcher.channel.bind('labels.update', (data) => {
      let label = self.findLabel(data.id);
      let name = label.typ + 'Labels';
      let state = {};
      self.state[name][label.index].description = data.label.description;
      state[name] = self.state[name];
      self.setState(state);
    });
    this.dispatcher.channel.bind('labels.destroy', (data) => {
      let label = self.findLabel(data.id);
      let name = label.typ + 'Labels';
      let state = {}
      self.state[name].splice(label.index, 1);
      state[name] = self.state[name];
      self.setState(state);
    });
    this.dispatcher.channel.bind('labels.update_position', (data) => {
      let label = self.findLabel(data.id);
      let state = {};
      let from = label.typ + 'Labels';
      let to = data.typ + 'Labels';
      self.state[from].splice(label.index, 1);
      self.state[to].splice(data.position - 1, 0, data.label);
      if (from == to) {
        state[from] = self.state[from];
      } else {
        state[from] = self.state[from];
        state[to] = self.state[to];
      }
      self.setState(state);
    });
    this.dispatcher.channel.bind('retrospectives.add_user', (data) => {
      self.state.users.push(data);
      self.setState({users: self.state.users});
    });
  }

  findLabel(id) {
    for (let labels of ['keepLabels', 'problemLabels', 'tryLabels']) {
      for (let i in this.state[labels]) {
        let label = this.state[labels][i];
        if (label.id == id) {
          label.index = parseInt(i);
          return label;
        }
      }
    }
    return null;
  }

  componentDidMount() {
    this.initWebSocket(this.props.id, this.props.url);
  }

  onDragStart(event, id) {
    this.dragStartId = id;
  }

  onDragEnd(event) {
    this.dragStartId = null;
  }

  onDrop(event) {
    event.preventDefault();
    let typ, position;
    if (jQuery(event.target).hasClass('js-labels')) {
      typ = jQuery(event.target).closest('.js-board').data('typ');
      position = this.state[typ + 'Labels'].length;
    } else {
      let id = jQuery(event.target).closest('.js-label').data('id');
      let label = this.findLabel(id);
      typ = label.typ;
      position = label.index;
    }
    this.dispatcher.trigger('labels.update_position', {retrospective_id: this.props.id, id: this.dragStartId, typ: typ, position: position + 1});
  }

  onDragOver(event) {
    event.preventDefault();
  }

  render() {
    let keepLabels = this.state.keepLabels.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} label={label} edit={this.edit.bind(this)} destroy={this.destroy.bind(this)} onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)} />
      );
    });

    let problemLabels = this.state.problemLabels.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} label={label} edit={this.edit.bind(this)} destroy={this.destroy.bind(this)} onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)} />
      );
    });

    let tryLabels = this.state.tryLabels.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} label={label} edit={this.edit.bind(this)} destroy={this.destroy.bind(this)} onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)} />
      );
    });

    return (
      <div className="retrospective__content">
        <div className="retrospective__boards">
          <div className="retrospective__board js-board" data-typ="keep" onClick={this.new.bind(this)}>
            <h4 className="retrospective__board-title">Keep</h4>
            <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{keepLabels}</div>
          </div>

          <div className="retrospective__board js-board" data-typ="problem" onClick={this.new.bind(this)}>
            <h4 className="retrospective__board-title">Problem</h4>
            <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{problemLabels}</div>
          </div>
        </div>

        <div className="retrospective__boards">
          <div className="retrospective__board js-board" data-typ="try" onClick={this.new.bind(this)}>
            <h4 className="retrospective__board-title">Try</h4>
            <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{tryLabels}</div>
          </div>
        </div>

        <RetrospectiveMenu users={this.state.users} addUser={this.addUser.bind(this)} />
      </div>
    );
  }
}
