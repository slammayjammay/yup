window.Yup = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Yup.Routers.Router({
      $rootEl: $('#content')
    });

    var navbar = new Yup.Views.Navbar({
      router: router
    });
    var user = new Yup.Models.User({ id: CURRENT_USER_ID });
    user.fetch();
    var sidebarLeft = new Yup.Views.SidebarLeft({
      router: router,
      model: user
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
  Yup.initialize();
});
