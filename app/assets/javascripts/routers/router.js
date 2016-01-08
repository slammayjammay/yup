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
    $(window).off('scroll');
    $(window).off('resize');

    $(window).scroll(function() {
      // TODO: Allow max of 20 results, then paginate
      // When user scrolls to the bottom, load more results
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        this._currentView.fetchNextPage();
      }

      this.scrollOrFixMap();
    }.bind(this));

    $(window).resize(function () {
      var leftPosition = this.findMapLeftPosition();
      $('#map').css('left', leftPosition + 'px');
    }.bind(this));
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

  findMapLeftPosition: function () {
    var width = $('#sidebar-right').width() - $('#map').width();
    if (width < 0) width = 0;

    return $('#sidebar-right').offset().left + (width / 2) + 1;
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
    // do stuff if map hasn't rendered yet
    var headerHeight = $('#navbar').height();
    if ($(window).scrollTop() > headerHeight) {
      $('#map').addClass('fixed-map');

      // fix to proper left position
      var leftPosition = this.findMapLeftPosition();
      $('#map').css('left', leftPosition + 'px');

      // fix to proper right position
      $('#map').css('top', 20 + 'px');

      // keep proper sidebar width
      var mapWidth = $('#map').width();
      $('#sidebar-right').css('min-width', mapWidth + 5);
    } else {
      $('#map').removeClass('fixed-map');
    }
  },

  search: function (query) {
    if (!query) return;
    this.addSearchEvents();

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
    // $('#content').css('width', '43%');
    // $('#sidebar-right').css('border-left', '1px solid #c5bdbd');
  },

  _swapSidebar: function (options) {
    this.sidebarRight && this.sidebarRight.remove();
    this.sidebarRight = new Yup.Views.SidebarRight(options);

    var $sidebar = $('<div id="sidebar-right">');
    $sidebar.html(this.sidebarRight.render().$el);

    $('#main').append($sidebar);
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
    // $('#content').css('width', '70%');
    // $('#sidebar-right').css('border', 'none');
  },
});
