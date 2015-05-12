app = @app

class RetrospectiveCtrl
  @$inject = ['$scope']
  @DEFAULT_RETROSPECTIVE_TIME = 5 * 60

  constructor: ($scope) ->
    $scope.init = =>
      $scope.keepLabels = []
      $scope.problemLabels = []
      $scope.tryLabels = []
      $scope.users = []
      $scope.url = jQuery('.js-retrospective-ctrl').data('url')
      $scope.id = jQuery('.js-retrospective-ctrl').data('id')
      $scope.initLabelForm()
      $scope.initSortable()
      $scope.initRetrospectiveTimes()
      $scope.initWebSocket()
      $scope.labelForm = new app.LabelForm('.js-label-form', save: $scope.save)
      $scope.timerId = null
      $scope.retrospectiveTime = RetrospectiveCtrl.DEFAULT_RETROSPECTIVE_TIME

    $scope.start = (e, ui) ->
      start =
        position: ui.item.closest('.js-labels-board').find('.js-kpt-label').index(ui.item)
        typ: ui.item.closest('.js-labels-board').data('typ')
      ui.item.data 'start', start

    $scope.stop = (e, ui) ->
      start = ui.item.data('start')
      ui.item.removeData 'start'
      end =
        position: ui.item.closest('.js-labels-board').find('.js-kpt-label').index(ui.item)
        typ: ui.item.closest('.js-labels-board').data('typ')
      id = ui.item.data('id')
      return if start.typ == end.typ and start.position == end.position
      ui.item.remove()
      $scope.dispatcher.trigger 'labels.update_position', retrospective_id: $scope.id, id: id, typ: end.typ, position: end.position + 1

    $scope.initSortable = ->
      jQuery('.js-labels-board').sortable
        items: '.js-kpt-label'
        connectWith: '.js-labels-board'
        start: $scope.start
        stop: $scope.stop

    $scope.initLabelForm = ->
      jQuery('.js-labels-board').click (e) ->
        $scope.labelForm.open e, {typ: jQuery(@).data('typ')}

    $scope.initRetrospectiveTimes = ->
      $scope.retrospectiveTimes = []
      for i in [1..15]
        label = if i > 9 then "#{i}:00" else "0#{i}:00"
        $scope.retrospectiveTimes[label] = i * 60

    $scope.initWebSocket = ->
      $scope.dispatcher = new WebSocketRails $scope.url
      $scope.dispatcher.channel = $scope.dispatcher.subscribe 'retrospective-' + $scope.id
      $scope.dispatcher.on_open = (data) ->
        $scope.dispatcher.trigger 'retrospectives.open', retrospective_id: $scope.id, (data) ->
          $scope.addLabel(label) for label in data.labels
          $scope.users = data.users
          $scope.$apply()

      $scope.dispatcher.channel.bind 'labels.create', (label) ->
        $scope["#{label.typ}Labels"].unshift label
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

      $scope.dispatcher.channel.bind 'timer.start', (data) ->
        clearInterval $scope.timerId
        $scope.timerId = null
        $scope.timerTime = data.time
        $scope.$apply()
        $scope.timerId = setInterval $scope.runTimer, 1000

      $scope.dispatcher.channel.bind 'timer.update', (data) ->
        return if $scope.timerId
        $scope.timerTime = data.time
        $scope.$apply()
        $scope.timerId = setInterval $scope.runTimer, 1000

      $scope.dispatcher.channel.bind 'timer.clear', (data) ->
        $scope.clearTimer()

    $scope.runTimer = ->
      $scope.timerTime--
      $scope.$apply()
      if $scope.timerTime is 0
        $scope.dispatcher.trigger 'timer.clear', retrospective_id: $scope.id
        alert 'time over'
      else
        $scope.dispatcher.trigger 'timer.update', retrospective_id: $scope.id, time: $scope.timerTime

    $scope.clearTimer = ->
      clearInterval $scope.timerId
      $scope.timerId = null
      $scope.retrospectiveTime = RetrospectiveCtrl.DEFAULT_RETROSPECTIVE_TIME
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
      item = jQuery(e.target).closest('.js-kpt-label')
      id = item.data('id')
      $scope.dispatcher.trigger 'labels.destroy', retrospective_id: $scope.id, id: id
      e.stopPropagation()

    $scope.edit = (e, label) ->
      $scope.labelForm.open e, label
      e.stopPropagation()

    $scope.addUser = (email) ->
      $scope.dispatcher.trigger 'retrospectives.add_user', retrospective_id: $scope.id, email: email
      $scope.email = ''

    $scope.startTimer = ->
      if $scope.timerId?
        $scope.dispatcher.trigger 'timer.clear', retrospective_id: $scope.id
      else
        $scope.dispatcher.trigger 'timer.start', retrospective_id: $scope.id, time: $scope.retrospectiveTime

@app.module.controller 'RetrospectiveCtrl', RetrospectiveCtrl