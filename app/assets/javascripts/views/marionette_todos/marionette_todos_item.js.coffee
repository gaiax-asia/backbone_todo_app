jQuery ->
  class MarionetteTodosApp.Views.TodosItem extends Backbone.View
    tagName: 'li'
    template: _.template($('#todo_item').html())
    events: {
      'click #todo-checkbox' : 'changeStatus'
      'click #edit-todo' : 'showEdit'
      'dblclick #todo-display-edit' : 'showEdit'
      'click .icon-remove-circle' : 'hideEdit'
      'blur #edit-todo-value':'hideEdit'
      'keypress #edit-todo-value' : 'updateOnEnter'
      'click #remove-todo' : 'removeTodo'
    }
    initialize: (options = {}) ->
      @model.on('change', @render, @)
      @model.on('success:update',@navIndex, @)
      @model.on('destroy', @remove, @)

    render: () ->
      @$el.html(@template({todo: @model.toJSON()}))
      return @

    navIndex: (event) ->
      event.preventDefault() if event?
      MarionetteTodosApp.currentRouter.navigate("/marionette_todos")

    changeStatus: (event) ->
      event.preventDefault()
      @model.changeStatus()

    showEdit: (event) ->
      event.preventDefault()
      MarionetteTodosApp.currentRouter.navigate("/marionette_todos/#{@model.id}/edit")
      @initEdit()

    initEdit: () ->
      @$el.find('#todo-editable').show()
      @$el.find('#todo-display-edit').hide()
      @$el.find('#edit-todo-value').focus()

    hideEdit: (event) ->
      event.preventDefault()
      @navIndex()
      @render()

    updateOnEnter: (event) ->
      enterKey = 13
      @model.updateItem(@$el.find('#edit-todo-value').val()) if event.which is enterKey

    removeTodo: (event) ->
      event.preventDefault()
      @model.destroy({wait:true}) if confirm("Do you really want to remove this Todo?")

    remove: () ->
      @$el.remove()
      @off()
