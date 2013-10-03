$(function(){
  TodosApp = {
    Views: {},
    Models: {},
    Collections: {},
    Routers: {},
    start: function(){
      if(Backbone.History.started == true){
        Bacbone.history.stop();
      }
      Backbone.history.start({pushState: true});
    }
  }

  _.templateSettings = {
    interpolate : /\{\%([\s\S]+?)\%\}/g
  };
});

