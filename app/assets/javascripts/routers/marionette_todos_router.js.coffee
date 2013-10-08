jQuery ->
  class MarionetteTodosApp.Routers.Todos extends Backbone.Router
    routes: {
      '(/marionette_todos)(/)' : 'index'
      'marionette_todos/:filter/filter(/)' : 'filter'
      'marionette_todos/:id/edit(/)' : 'edit'
      'marionette_todos/new' : 'newTodo'
    }

    initialize: (todoJSON) ->
      @todos = new MarionetteTodosApp.Collections.Todos(todoJSON)
      @todosView = new MarionetteTodosApp.Views.TodosIndex({collection: @todos}).render()
      $('div#main').append(@todosView.el)
      MarionetteTodosApp.start()

    index: () ->

    filter: (filter) ->
      @todosView.render(filter) if filter?

    edit: (id) ->
      todoView = _.find(@todosView.todoItems, (item) ->
        return item.model.id is parseInt(id)
      )
      if todoView?
        todoView.initEdit()
      else
        alert('Todo item not found.')
        @navigate('/marionette_todos')

    newTodo: () ->
      @todosView.initAdd()
