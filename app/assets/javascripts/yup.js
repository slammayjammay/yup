window.Yup = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Yup.Routers.Router({
      $rootEl: $('#main')
    });
    router.on('route', function () {
      $(window).scrollTop(0);
    });

    var navbar = new Yup.Views.Navbar();
    $('#navbar').html(navbar.render().$el);

    var user = new Yup.Models.User({ id: CURRENT_USER_ID });
    user.fetch();

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Yup.initialize();
});
