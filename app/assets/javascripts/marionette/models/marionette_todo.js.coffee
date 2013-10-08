jQuery ->
  class MarionetteTodosApp.Models.Todo extends Backbone.Model
    urlRoot: '/marionette_todos'
    validate: (attrs, options) ->
      if not attrs.item? or attrs.item is ""
        "Item cannot be blank"

    initialize: (options = {}) ->
      @on('invalid',@hasError)

    hasError: (model, error) ->
      alert(error)

    changeStatus: () ->
      new_status = if parseInt(@escape('status')) is 0
        1
      else
        0
      @sync('update',@set({status: new_status}),{wait: true}) # force PUT requests

    updateItem: (item) ->
      if item isnt @escape('item')
        @sync('update',@set({item: item}),
        {
          success: (model) =>
            @trigger('success:update')
          wait: true})

