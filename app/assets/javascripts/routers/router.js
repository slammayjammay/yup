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

  businessShow: function (id) {
    var business = new Yup.Models.Business({ id: id });
    business.fetch();

    var view = new Yup.Views.BusinessShow({
      model: business
    });
    this._swapView(view);
    this.sidebarRight && this.sidebarRight.remove();
    $('#content').css('width', '70%');
    $('#sidebar-right').css('border', 'none');
  },

  feed: function () {
    var reviews = new Yup.Collections.Reviews();
    reviews.fetch();
    var view = new Yup.Views.FeedShow({ collection: reviews });
    this._swapView(view);
    this._swapSidebar({ collection: new Yup.Collections.Businesses() });
    $('#content').css('width', '43%');
    $('#sidebar-right').css('border-left', '1px solid #c5bdbd');
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

  search: function (query) {
    if (!query) return;

    $(window).off('scroll');
    $(window).scroll(function() {
      // TODO: Allow max of 20 results, then paginate
      // When user scrolls to the bottom, load more results
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        this._currentView.fetchNextPage();
      }
    }.bind(this));

    var businesses = new Yup.Collections.Businesses();
    businesses.fetch({
      data: { searchKeys: query }
    });

    this._swapSidebar({
      collection: businesses,
      query: query,
    });

    var view = new Yup.Views.SearchShow({
      query: query,
      collection: businesses
    });

    this._swapView(view);
    $('#content').css('width', '43%');
    $('#sidebar-right').css('border-left', '1px solid #c5bdbd');
  },

  _swapSidebar: function (options) {
    this.sidebarRight && this.sidebarRight.remove();
    this.sidebarRight = new Yup.Views.SidebarRight(options);
    $('#sidebar-right').html(this.sidebarRight.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  userShow: function (id) {
    var user = new Yup.Models.User({ id: id });
    user.fetch();
    var view = new Yup.Views.UserShow({
      model: user,
      collection: user.reviews()
    });

    this._swapView(view);
    this.sidebarRight && this.sidebarRight.remove();
    $('#content').css('width', '70%');
    $('#sidebar-right').css('border', 'none');
  },
});
