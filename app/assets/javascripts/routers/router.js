Yup.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "bestOf",
    "businesses/:id": "businessShow",
    "search(/:query)": "search",
    "users/:name/:imageUrl": "userShow",
    "users/:id": "userShow"
  },

  addSearchEvents: function () {
    $(window).scroll(function() {
      // TODO: Allow max of 20 results, then paginate
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
        this._currentView.fetchNextPage();
      }

      this.scrollOrFixMap();
    }.bind(this));
  },

  bestOf: function () {
    var businesses = new Yup.Collections.Businesses();
    businesses.fetch({
      data: { category: 'food' }
    });
    var view = new Yup.Views.BestOf({
      collection: businesses
    });
    this._swapView(view);
  },

  businessShow: function (id) {
    this.removeEvents();

    var business = new Yup.Models.Business({ id: id });
    business.fetch();

    var view = new Yup.Views.BusinessShow({
      model: business,
      collection: business.reviews()
    });
    this._swapView(view);
    this.sidebarRight && this.sidebarRight.remove();
  },

  removeEvents: function () {
    $(window).off('scroll');
  },

  scrollOrFixMap: function () {
    var headerHeight = $('#navbar').height();
    var distTop = 25;
    var fixedTopPos = $(window).scrollTop() - headerHeight + distTop;

    if ($(window).scrollTop() > headerHeight) {
      $('#map').css('top', fixedTopPos + 'px');
    } else {
      $('#map').css('top', distTop + 'px');
    }
  },

  search: function (query) {
    if (!query) query = '';
    this.removeEvents();
    this.addSearchEvents();

    var businesses = new Yup.Collections.Businesses();
    businesses.fetch({
      data: { searchKeys: query }
    });

    var view = new Yup.Views.SearchShow({
      collection: businesses,
      query: query
    });

    this._swapView(view);
  },

  userShow: function (id, imageUrl) {
    this.removeEvents();
    var data = {};

    // if user is a yup user, id is a number. if user is a yelp user, id is the
    // name of the user
    if (!parseInt(id) > 0) {
      data = {
        name: id,
        imageUrl: imageUrl,
        isYelpUser: true
      };
      id = parseInt(Math.random() * 100) + 2;
    }

    var user = new Yup.Models.User({ id: id });
    user.fetch({ data: data });

    var view = new Yup.Views.UserShow({ model: user });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
