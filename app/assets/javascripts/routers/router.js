YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "home": "home",
    "users/:id": "userShow",
    "businesses/:id": "businessShow",
    "search": "_search"
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

  home: function () {
    var businesses = new YelpClone.Collections.Businesses();
    businesses.fetch({
      // url: '/api/businesses/search'
    });
    var view = new YelpClone.Views.HomeIndex({
      collection: businesses
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

  _search: function (query) {
    var businesses = new YelpClone.Collections.Businesses();
    businesses.fetch({
      url: 'api/businesses',
      data: { searchKeys: query }
    });
    var view = new YelpClone.Views.HomeIndex({
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
