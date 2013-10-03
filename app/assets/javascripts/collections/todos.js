$(function(){
  TodosApp.Collections.Todos = Backbone.Collection.extend({
    url: '/todos',
    model: TodosApp.Models.Todo,
    addTodo: function(item){
      _this = this
      todo = new TodosApp.Models.Todo();
      todo.save({item:item},
      {
        success: function(model){
          _this.add(model);
          _this.trigger('add:success')
      }
      });
    }
  });
});
