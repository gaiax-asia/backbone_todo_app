$(function(){
  TodosApp.Models.Todo = Backbone.Model.extend({
    urlRoot: '/todos',
    defaults: {
      status: 0
    },
    validate: function(attrs, options){
      if(typeof attrs.item === "undefined" || attrs.item === null || attrs.item == ''){
        return "Item cannot be blank"
      }
    },
    initialize: function(options){
      options = options || {}
      this.on('invalid',this.hasError)
    },
    hasError: function(model, error){
      alert(error);
    },
    changeStatus: function(){
      if(this.escape('status') == 0){
        new_status = 1;
      }
      else{
        new_status = 0;
      }
      this.save({status: new_status},{wait: true})
    },
    updateItem: function(item){
      this.save({item: item},{wait: true})
    }
  })
});

