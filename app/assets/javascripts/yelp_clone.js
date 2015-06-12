window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new YelpClone.Routers.Router({
      $rootEl: $('#content')
    });

    var navbar = new YelpClone.Views.Navbar({
      router: router
    });
    $('#navbar').html(navbar.render().$el);
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  YelpClone.initialize();
});
