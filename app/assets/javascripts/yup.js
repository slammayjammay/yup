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

    var sidebarLeft = new YelpClone.Views.SidebarLeft({
      router: router
    });

    router.on('route', function() {
      $(document).scrollTop(0);
    });

    $('#navbar').html(navbar.render().$el);
    $('#sidebar-left').html(sidebarLeft.render().$el);

    Backbone.history.start();
  }
};

$(document).ready(function(){
  YelpClone.initialize();
});
