window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new YelpClone.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  YelpClone.initialize();
});
