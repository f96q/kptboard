'use strict';

$(document).ready(() => {
  if ($('.js-retrospective')[0]) {
    let id = $('.js-retrospective').data('id');
    let url = $('.js-retrospective').data('url');
    window.webSocketUtils = new WebSocketUtils(id, url);
    window.labelActions = new LabelActions(dispatcher);
    window.labelStore = new LabelStore(dispatcher);
    window.retrospectivesUserActions = new RetrospectivesUserActions(dispatcher);
    window.retrospectivesUserStore = new RetrospectivesUserStore(dispatcher);
    React.render(React.createElement(Retrospective, {id: id}), $('.js-retrospective')[0]);
  }
});
