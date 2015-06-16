YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "users/:id": "userShow",
    "businesses/:id": "businessShow",
    "search": "search"
  },

  businessShow: function (id) {
    var business = new YelpClone.Models.Business({ id: id });
    business.fetch();
    var view = new YelpClone.Views.BusinessShow({
      model: business,
      collection: business.reviews()
    });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = new YelpClone.Models.User({ id: id });
    user.fetch();
    var view = new YelpClone.Views.UserShow({
      model: user
    });

    this._swapView(view);
  },

  search: function (query, order) {
    query = query || 'restaurants';
    var businesses = new YelpClone.Collections.Businesses();
    businesses.fetch({
      url: 'api/businesses',
      data: { searchKeys: query, order: order }
    });
    var view = new YelpClone.Views.SearchShow({
      router: this,
      query: query,
      collection: businesses
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
