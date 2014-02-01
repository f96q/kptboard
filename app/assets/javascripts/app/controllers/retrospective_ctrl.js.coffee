app = @app

class @RetrospectiveCtrl
  @$inject = ['$scope']

  constructor: ($scope) ->
    $scope.init = ->
      $scope.keepLabels = []
      $scope.problemLabels = []
      $scope.tryLabels = []
      $scope.users = []
      $scope.url = jQuery('.retrospective-ctrl').data('url')
      $scope.id = jQuery('.retrospective-ctrl').data('id')
      $scope.initNavBar()
      $scope.initLabelForm()
      $scope.initSortable()
      $scope.initWebSocket()
      $scope.labelForm = new app.LabelForm('#label-form', save: $scope.save)

    $scope.initNavBar =->
      showNavBar = true
      jQuery('.page-header').click ->
        showNavBar^= true
        jQuery('.navbar').toggle()
        jQuery('body').css('padding-top': if showNavBar then 60 else 0)
        jQuery('.page-header').css('margin-top' : if showNavBar then 40 else 0)
        jQuery('.page-header h1').css('margin-top' : if showNavBar then 20 else 0)

    $scope.start = (e, ui) ->
      start =
        position: ui.item.closest('.labels-board').find('.kpt-label').index(ui.item)
        typ: ui.item.closest('.labels-board').data('typ')
      ui.item.data 'start', start

    $scope.stop = (e, ui) ->
      start = ui.item.data('start')
      ui.item.removeData 'start'
      end =
        position: ui.item.closest('.labels-board').find('.kpt-label').index(ui.item)
        typ: ui.item.closest('.labels-board').data('typ')
      id = ui.item.data('id')
      return if start.typ == end.typ and start.position == end.position
      ui.item.remove()
      $scope.dispatcher.trigger 'labels.update_position', retrospective_id: $scope.id, id: id, typ: end.typ, position: end.position + 1

    $scope.initSortable = ->
      jQuery('.labels-board').sortable
        items: '.kpt-label'
        connectWith: '.labels-board'
        start: $scope.start
        stop: $scope.stop

    $scope.initLabelForm = ->
      jQuery('.labels-board').click (e) ->
        $scope.labelForm.open e, {typ: jQuery(@).data('typ')}

    $scope.initWebSocket = ->
      $scope.dispatcher = new WebSocketRails $scope.url
      $scope.dispatcher.channel = $scope.dispatcher.subscribe 'retrospective-' + $scope.id
      $scope.dispatcher.on_open = (data) ->
        $scope.dispatcher.trigger 'retrospectives.open', retrospective_id: $scope.id, (data) ->
          $scope.addLabel(label) for label in data.labels
          $scope.users = data.users
          $scope.$apply()

      $scope.dispatcher.channel.bind 'labels.create', (label) ->
        $scope.addLabel(label)
        $scope.$apply()

      $scope.dispatcher.channel.bind 'labels.update', (data) ->
        label = $scope.getLabel data.id
        angular.extend $scope["#{label.typ}Labels"][label.index], data.label
        $scope.$apply()

      $scope.dispatcher.channel.bind 'labels.destroy', (data) ->
        label = $scope.getLabel data.id
        $scope["#{label.typ}Labels"].splice label.index, 1
        $scope.$apply()

      $scope.dispatcher.channel.bind 'labels.update_position', (data) ->
        label = $scope.getLabel data.id
        $scope["#{label.typ}Labels"].splice label.index, 1
        $scope["#{data.typ}Labels"].splice data.position - 1, 0, data.label
        $scope.$apply()

      $scope.dispatcher.channel.bind 'retrospectives.add_user', (data) ->
        $scope.users.push data
        $scope.$apply()

    $scope.addLabel = (label) ->
      $scope["#{label.typ}Labels"].push label

    $scope.getLabel = (id) ->
      for typ in ['keep', 'problem', 'try']
        for label, i in $scope["#{typ}Labels"]
          return {index: i, typ: label.typ} if label.id is id
      null

    $scope.save = (label) ->
      if label.id?
        $scope.update label
      else
        $scope.create label
      $scope.labelForm.close()

    $scope.create = (label) ->
      $scope.dispatcher.trigger 'labels.create', retrospective_id: $scope.id, label: label

    $scope.update = (label) ->
      $scope.dispatcher.trigger 'labels.update', retrospective_id: $scope.id, id: label.id, label: {description: label.description}

    $scope.destroy = (e) ->
      item = jQuery(e.target).closest('.kpt-label')
      id = item.data('id')
      $scope.dispatcher.trigger 'labels.destroy', retrospective_id: $scope.id, id: id
      e.stopPropagation()

    $scope.edit = (e, label) ->
      $scope.labelForm.open e, label
      e.stopPropagation()

    $scope.addUser = (email) ->
      $scope.dispatcher.trigger 'retrospectives.add_user', retrospective_id: $scope.id, email: email
      $scope.email = ''