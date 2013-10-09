jQuery ->
  window.MarionetteTodosApp = {
    Views: {}
    Models: {}
    Collections: {}
    Controllers: {}
    Routers: {}
    start: ->
      if Backbone.History.started == true
        Bacbone.history.stop()
      Backbone.history.start({pushState: true})
  }

  window._.templateSettings = {
    interpolate : /\{\%([\s\S]+?)\%\}/g
  }

