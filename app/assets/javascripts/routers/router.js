YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "home": "home",
    "userShow": "userShow",
    "businesses/:id": "businessShow",
    "businesses/:id/review": "businessReview"
  },

  businessReview: function (id) {
    var business = new YelpClone.Models.Business({ id: id });
    business.fetch();
    var view = new YelpClone.Views.ReviewForm({
      model: business
    });
    this._swapView(view);
  },

  businessShow: function (id) {
    var business = new YelpClone.Models.Business({ id: id });
    business.fetch();
    var view = new YelpClone.Views.BusinessShow({
      model: business
    });

    this._swapView(view);
  },

  home: function () {
    var businesses = new YelpClone.Collections.Businesses();
    businesses.fetch();
    var view = new YelpClone.Views.HomeIndex({
      collection: businesses
    });
    this._swapView(view);
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
