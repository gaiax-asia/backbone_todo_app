jQuery ->
  class MarionetteTodosApp.Views.TodosIndex extends Backbone.Marionette.CompositeView
    tagName: 'div'
    className: 'todos'
    template: _.template($('#todo_index').html()) #_.template($('#todo_index').html())
    itemViewContainer: 'ul.list'
    itemView: MarionetteTodosApp.Views.TodoItem

    events: {
      'click .icon-plus' : 'showAdd'
      'click #hide-add-todo' : 'hideAdd'
      'blur #add-todo-value':'hideAdd'
      'keypress #add-todo-value' : 'saveOnEnter'
      'dblclick #todo-display-add' : 'showAdd'
      'click #filter-done' : 'filterDone'
      'click #filter-pending' : 'filterPending'
      'click #reset' : 'reset'

    }

    filterDone: (event) ->
      event.preventDefault()
      MarionetteTodosApp.currentRouter.navigate('/marionette_todos/done/filter')
      @render('done')

    filterPending: (event) ->
      event.preventDefault()
      MarionetteTodosApp.currentRouter.navigate('/marionette_todos/pending/filter')
      @render('pending')

    reset: (event) ->
      event.preventDefault()
      MarionetteTodosApp.currentRouter.navigate('/marionette_todos')
      @collection.fetch({
        success: =>
          @collection.trigger('reset')
        wait: true
      })

    initialize: (options = {}) ->
      @collection.on('add', @addOne, @)
      @collection.on('add:success',@clearAdd, @)
      @collection.on('reset',@render,@)
      @todoItems = []

    clearAdd: () ->
      @$el.find('#todo-addable').hide()
      @$el.find('#todo-display-add').show()
      @$el.find('#add-todo-value').val(null)

    render: (filter) ->
      @$el.html(@template())
      if filter?
        collection = []
        if filter is 'done'
          collection = @collection.done()
        else if filter is 'pending'
          collection = @collection.pending()

        if collection isnt []
          _.each(collection, (todo) =>
            @addOne(todo)
          )
      else
        @collection.forEach(@addOne,@)

      return @

    addOne: (item) ->
      item_view = new MarionetteTodosApp.Views.TodosItem({model: item})
      item_view.render()
      @$el.find('.list').append(item_view.el)
      @todoItems.push(item_view)

    showAdd: (event) ->
      event.preventDefault()
      MarionetteTodosApp.currentRouter.navigate('/marionette_todos/new')
      @initAdd()

    initAdd: () ->
      @$el.find('#todo-addable').show()
      @$el.find('#todo-display-add').hide()
      @$el.find('#add-todo-value').focus()

    hideAdd: (event) ->
      event.preventDefault()
      MarionetteTodosApp.currentRouter.navigate('/marionette_todos')
      @clearAdd()

    saveOnEnter: (event) ->
      enterKey = 13
      if event.which is enterKey
        @collection.addTodo(@$el.find('#add-todo-value').val())