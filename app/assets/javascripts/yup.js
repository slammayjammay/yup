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
    $('#navbar').html(navbar.render().$el);

    var user = new Yup.Models.User({ id: CURRENT_USER_ID });
    user.fetch();

    router.on('route', function() {
      $(document).scrollTop(0);
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Yup.initialize();
});
