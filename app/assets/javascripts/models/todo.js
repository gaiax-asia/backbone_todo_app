$(function(){
  TodosApp.Models.Todo = Backbone.Model.extend({
    urlRoot: '/todos',
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
      this.save({status: new_status},{type: 'PUT', wait: true}) // force PUT requests
    },
    updateItem: function(item){
      if(item !== this.escape('item')){
        this.save({item: item},{type: 'PUT',wait: true})
      }
    }
  })
});

