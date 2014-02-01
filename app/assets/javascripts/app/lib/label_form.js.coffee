app = @app

class app.LabelForm
  constructor: (selector, options) ->
    @options = options
    @form = jQuery(selector)
    @form.find('.description').val('')
    @form.find('.description').keydown (e) =>
      @save() if e.keyCode == 13

    @form.data(typ: '')
    @form.data(id: '')
    @form.dialog
      autoOpen: false
      close: @close
      buttons:
        save: @save

  save: =>
    label = @getLabel()
    return unless label.description
    @options.save label

  setLabel: (label) ->
    @form.data(typ: label.typ)
    @form.data(id: label.id) if label.id?
    @form.find('.description').val(label.description)

  getLabel: ->
    label = {typ: @form.data('typ'),  description: @form.find('.description').val()}
    id = @form.data('id')
    label.id = id unless id is ''
    label

  clear: ->
    @form.data(typ: '')
    @form.data(id: '')
    @form.find('.description').val('')

  open: (e, label) ->
    @setLabel label
    @form.dialog(position: [e.clientX, e.clientY]).dialog('open')

  close: =>
    @clear()
    @form.dialog('close')