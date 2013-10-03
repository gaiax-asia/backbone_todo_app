$(function(){
  TodosApp.Routers.Todos = Backbone.Router.extend({
    routes: {
      '(/todos)(/)' : 'index',
      'todos/:id/edit(/)' : 'edit',
      'todos/new' : 'newTodo'
    },
    initialize: function(todoJSON){
      this.todos = new TodosApp.Collections.Todos(todoJSON);
      this.todosView = new TodosApp.Views.TodosIndex({collection: this.todos}).render();
      $('div#main').append(this.todosView.el);
      TodosApp.start();
    },
    index: function(){
    },
    edit: function(id){
      todoView = _.find(this.todosView.todoItems,function(item){
        return item.model.id == id;
      });
      if (todoView !== undefined){
        todoView.initEdit();
      }
      else{
        alert('Todo item not found.');
        this.navigate('/todos')
      }
    },
    newTodo: function(){
      this.todosView.initAdd();
    }
  });
});

