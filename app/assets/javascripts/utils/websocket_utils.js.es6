'use strict';

class WebSocketUtils {
  constructor(id, url) {
    this.dispatcher = new WebSocketRails(url);
    this.dispatcher.channel = this.dispatcher.subscribe(`retrospective-${id}`);
    this.dispatcher.on_open = (data) => {
      this.dispatcher.trigger('retrospectives.open', {retrospective_id: id}, (data) => {
        labelActions.setLabels(data.labels);
        retrospectivesUserActions.setUsers(data.users);
      });
    }
    this.dispatcher.channel.bind('labels.create', (data) => {
      labelActions._create(data);
    });
    this.dispatcher.channel.bind('labels.update', (data) => {
      labelActions._update(data.id, data.label);
    });
    this.dispatcher.channel.bind('labels.destroy', (data) => {
      labelActions._destroy(data.id);
    });
    this.dispatcher.channel.bind('labels.update_position', (data) => {
      labelActions._drop(data.id, data.typ, data.position - 1);
    });
    this.dispatcher.channel.bind('retrospectives.add_user', (data) => {
      retrospectivesUserActions._create(data);
    });
  }

  trigger(type, data) {
    this.dispatcher.trigger(type, data);
  }
}
