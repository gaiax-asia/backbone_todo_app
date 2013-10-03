$(function(){

  TodosApp.Views.TodosIndex = Backbone.View.extend({
    tagName: 'div',
    className: 'todos',
    template: _.template($('#todo_index').html()),
    events: {
      'click .icon-plus' : 'showAdd',
      'click #hide-add-todo' : 'hideAdd',
      'blur #add-todo-value':'hideAdd',
      'keypress #add-todo-value' : 'saveOnEnter',
      'dblclick #add-todo' : 'showAdd'

    },
    initialize: function(options){
      options = options || {}
      this.collection.on('add', this.addOne, this);
      this.collection.on('add:success',this.clearAdd, this);
      this.todoItems = []
    },
    clearAdd: function(){
      this.$el.find('#todo-addable').hide();
      this.$el.find('#todo-display').show();
      this.$el.find('#add-todo-value').val(null);
    },
    render: function(){
      this.$el.html(this.template())
      this.collection.forEach(this.addOne,this);
      return this
    },
    addOne: function(item){
      item_view = new TodosApp.Views.TodosItem({model: item});
      item_view.render();
      this.$el.find('.list').append(item_view.el);
      this.todoItems.push(item_view);
    },
    showAdd: function(event){
      event.preventDefault();
      TodosApp.currentRouter.navigate('/todos/new');
      this.initAdd();
    },
    initAdd: function(){
      this.$el.find('#todo-addable').show();
      this.$el.find('#todo-display').hide();
      this.$el.find('#add-todo-value').focus();
    },
    hideAdd: function(event){
      event.preventDefault();
      TodosApp.currentRouter.navigate('/todos');
      this.clearAdd();
    },
    saveOnEnter: function(event){
      enterKey = 13;
      if(event.which === enterKey){
        this.collection.addTodo(this.$el.find('#add-todo-value').val());
      }
    }
  });
});