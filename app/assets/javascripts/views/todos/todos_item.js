$(function(){
  TodosApp.Views.TodosItem = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#todo_item').html()),
    events: {
      'click #todo-checkbox' : 'changeStatus',
      'click #edit-todo' : 'showEdit',
      'dblclick' : 'showEdit',
      'click .icon-remove-circle' : 'hideEdit',
      'blur #edit-todo-value':'hideEdit',
      'keypress #edit-todo-value' : 'updateOnEnter',
      'click #remove-todo' : 'removeTodo'
    },
    initialize: function(options){
      options = options || {}
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },
    render: function(){
      this.$el.html(this.template({todo: this.model.toJSON()}))
      return this
    },
    changeStatus: function(event){
      event.preventDefault();
      this.model.changeStatus();
    },
    showEdit: function(event){
      event.preventDefault();
      TodosApp.currentRouter.navigate('/todos/'+ this.model.id +'/edit');
      this.initEdit();
    },
    initEdit: function(){
      this.$el.find('#todo-editable').show()
      this.$el.find('#todo-display').hide()
      this.$el.find('#edit-todo-value').focus();
    },
    hideEdit: function(event){
      event.preventDefault();
      TodosApp.currentRouter.navigate('/todos');
      this.render();
    },
    updateOnEnter: function(event){
      enterKey = 13;
      if(event.which === enterKey){
        this.model.updateItem(this.$el.find('#edit-todo-value').val());
      }
    },
    removeTodo: function(event){
      event.preventDefault();
      if(confirm("Do you really want to remove this Todo?")){
        this.model.destroy({wait:true})
      }
    },
    remove: function(){
      this.$el.remove();
    }
  })
});