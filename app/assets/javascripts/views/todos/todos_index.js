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
      'dblclick #todo-display-add' : 'showAdd',
      'click #filter-done' : 'filterDone',
      'click #filter-pending' : 'filterPending',
      'click #reset' : 'reset'

    },
    filterDone: function(event){
      event.preventDefault();
      this.render('done');
    },
    filterPending: function(event){
      event.preventDefault();
      this.render('pending');
    },
    reset: function(event){
      event.preventDefault();
      this.collection.trigger('reset');
    },
    initialize: function(options){
      options = options || {}
      this.collection.on('add', this.addOne, this);
      this.collection.on('add:success',this.clearAdd, this);
      this.collection.on('reset',this.render,this);
      this.todoItems = []
    },
    clearAdd: function(){
      this.$el.find('#todo-addable').hide();
      this.$el.find('#todo-display-add').show();
      this.$el.find('#add-todo-value').val(null);
    },
    render: function(filter){
      this.$el.html(this.template());
      if(typeof filter !== 'undefined' && filter !== null){
        collection = [];
        _this = this;
        if(filter === 'done'){
          collection = this.collection.done();
        }else if (filter === 'pending'){
          collection = this.collection.pending();
        }
        _.each(collection,function(todo){
          _this.addOne(todo);
        });
      }
      else {
        this.collection.forEach(this.addOne,this);
      }
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
      this.$el.find('#todo-display-add').hide();
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