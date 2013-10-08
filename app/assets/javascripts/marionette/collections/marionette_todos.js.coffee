jQuery ->
  class MarionetteTodosApp.Collections.Todos extends Backbone.Collection
    url: '/marionette_todos'
    model: MarionetteTodosApp.Models.Todo
    addTodo: (item) ->
      todo = new MarionetteTodosApp.Models.Todo()
      todo.save({item:item},
        {
          success: (model) =>
            @add(model)
            @trigger('add:success')
        }
      )

    done: () ->
      @filter((todo) ->
        return parseInt(todo.escape('status')) is 1
      )

    pending: () ->
      @without.apply(@, @done())