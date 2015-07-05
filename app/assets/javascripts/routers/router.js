Yup.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
        this.renderNextPage();
      }
    }.bind(this));
  },

  routes: {
    "": "feed",
    "users/:id": "userShow",
    "businesses/:id": "businessShow",
    "search(/:query)(/:order)": "search"
  },

  businessShow: function (id) {
    var business = new Yup.Models.Business({ id: id });
    business.fetch();
    var view = new Yup.Views.BusinessShow({
      model: business,
      collection: business.reviews()
    });
    this._swapView(view);
  },

  feed: function () {
    var reviews = new Yup.Collections.Reviews();
    reviews.fetch();
    var view = new Yup.Views.FeedShow({ collection: reviews });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = new Yup.Models.User({ id: id });
    user.fetch();
    var view = new Yup.Views.UserShow({
      model: user,
      collection: user.reviews()
    });

    this._swapView(view);
  },

  renderNextPage: function () {
    if (this._currentView.$el.attr('class') == 'search-show') {
      this._currentView.collection.fetch({
        remove: false,
        data: { searchKeys: this.query,
                order: this.order,
                page: this._currentView.collection.page + 1
              },
        success: function (model, response) {
          this._currentView.map.showNewResults(response.businesses);
        }.bind(this)
      });
    }
  },

  search: function (query, order) {
    this.query = query || 'restaurants';
    this.order = order || 'id';
    var businesses = new Yup.Collections.Businesses();
    businesses.fetch({
      data: { searchKeys: this.query, order: this.order }
    });

    this.sidebarRight && this.sidebarRight.remove();
    this.sidebarRight = new Yup.Views.SidebarRight({
      collection: businesses
    });
    $('#sidebar-right').html(this.sidebarRight.render().$el);

    var view = new Yup.Views.SearchShow({
      query: this.query,
      order: this.order,
      collection: businesses,
      map: this.sidebarRight.map
    });

    this._swapView(view);
  },

  // _swapSidebar: function (sidebar) {
  //   this.sidebarRight && this.sidebarRight.remove();
  //   this.sidebarRight = sidebar;
  //   $('#sidebar-right').html(this.sidebarRight.render().$el);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
