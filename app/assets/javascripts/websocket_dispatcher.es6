(function() {

class WebSocketDispatcher {
  constructor(retrospectiveId, url, store) {
    this.retrospectiveId = retrospectiveId;
    this.dispatcher = new WebSocketRails(url);
    this.dispatcher.channel = this.dispatcher.subscribe(`retrospective-${retrospectiveId}`);
    this.dispatcher.on_open = (data) => {
      this.dispatcher.trigger('retrospectives.open', {retrospective_id: this.retrospectiveId}, (data) => {
        store.dispatch({type: app.ActionTypes.SET_RETROSPECTIVE, retrospective: data});
      });
    }
    this.dispatcher.channel.bind('labels.create', (data) => {
      store.dispatch({type: app.ActionTypes.CREATE_LABEL, label: data});
    });
    this.dispatcher.channel.bind('labels.update', (data) => {
      store.dispatch({type: app.ActionTypes.UPDATE_LABEL, id: data.id, label: data.label});
    });
    this.dispatcher.channel.bind('labels.destroy', (data) => {
      store.dispatch({type: app.ActionTypes.DESTROY_LABEL, id: data.id});
    });
    this.dispatcher.channel.bind('labels.update_position', (data) => {
      store.dispatch({type: app.ActionTypes.DROP_LABEL, id: data.id, typ: data.typ, index: data.position - 1});
    });
    this.dispatcher.channel.bind('retrospectives.add_user', (data) => {
      store.dispatch({type: app.ActionTypes.ADD_USER, user: data});
    });
    this.dispatcher.channel.bind('retrospectives.remove_user', (data) => {
      store.dispatch({type: app.ActionTypes.REMOVE_USER, id: data.id});
    });
  }

  trigger(type, data) {
    this.dispatcher.trigger(type, Object.assign({}, data, {retrospective_id: this.retrospectiveId}));
  }
}

app.createWebSocketDispatcher = function(retrospectiveId, url, store) {
  return new WebSocketDispatcher(retrospectiveId, url, store);
};

})();
