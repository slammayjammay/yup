window.yup = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new yup.Routers.Router({
      $rootEl: $('#content')
    });

    var navbar = new yup.Views.Navbar({
      router: router
    });
    var user = new yup.Models.User({ id: CURRENT_USER_ID });
    user.fetch();
    var sidebarLeft = new yup.Views.SidebarLeft({
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
  yup.initialize();
});
