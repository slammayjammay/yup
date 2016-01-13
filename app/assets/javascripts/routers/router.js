Yup.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "search",
    "feed": "feed",
    "users/:id": "userShow",
    "businesses/:id": "businessShow",
    "search(/:query)": "search"
  },

  addSearchEvents: function () {
    $(window).scroll(function() {
      // TODO: Allow max of 20 results, then paginate
      // When user scrolls to the bottom, load more results
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
        this._currentView.fetchNextPage();
      }

      this.scrollOrFixMap();
    }.bind(this));
  },

  businessShow: function (id) {
    this.removeEvents();

    var business = new Yup.Models.Business({ id: id });
    business.fetch();

    var view = new Yup.Views.BusinessShow({
      model: business
    });
    this._swapView(view);
    this.sidebarRight && this.sidebarRight.remove();
  },

  feed: function () {
    this.removeEvents();

    var reviews = new Yup.Collections.Reviews();
    reviews.fetch();
    var view = new Yup.Views.FeedShow({ collection: reviews });
    this._swapView(view);
    this._swapSidebar({ collection: new Yup.Collections.Businesses() });
  },

  removeEvents: function () {
    $(window).off('scroll');
  },

  renderBestOf: function () {
    var businesses = new Yup.Collections.Businesses();
    businesses.fetch({
      data: { bestOf: true }
    });
    this._swapSidebar({ collection: businesses });

    var view = new Yup.Views.SearchShow({
      template: JST['search/best_of'],
      collection: businesses,
      map: this.sidebarRight.map
    });
    this._swapView(view);
  },

  scrollOrFixMap: function () {
    var headerHeight = $('#navbar').height();
    var distTop = 15;
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

  userShow: function (id) {
    this.removeEvents();

    var user = new Yup.Models.User({ id: id });
    user.fetch();
    var view = new Yup.Views.UserShow({
      model: user,
      collection: user.reviews()
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },
});
