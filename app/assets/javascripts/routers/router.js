YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "home": "userShow"
  },

  userShow: function (id) {
    var user = new YelpClone.Models.User({ id: CURRENT_USER_ID });
    user.fetch();
    var view = new YelpClone.Views.UserShow({
      model: user
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
