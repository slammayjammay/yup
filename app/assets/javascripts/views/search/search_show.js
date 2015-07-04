Yup.Views.SearchShow = Backbone.CompositeView.extend({
  className: 'search-show',
  template: JST['search/search_show'],
  events: {
    "click .category-index-item": "switchBusinesses",
    "click .filter": "filter"
  },

  initialize: function (options) {
    // this.map = new Yup.Views.MapShow({ collection: this.collection });
    // setTimeout(function () {
    //   this.map.initSearchMap();
    // }.bind(this), 1000);

    this.router = options.router;
    this.query = options.query;
    this.order = options.order;

    this.categories = ['restaurants', 'food', 'nightlife', 'shopping',
      'bars', 'coffee', 'health'];
    // this.renderCategories();

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBusiness.bind(this));
  },

  filter: function (event) {
    var order = $(event.currentTarget).find('input').attr('class');
    Backbone.history.navigate("search/");
    this.router.search(this.query, order);
  },

  render: function () {
    var content = this.template({
      businesses: this.collection,
      query: this.query,
      order: this.order
    });
    this.$el.html(content);
    this.attachSubviews();

    // if (this.$('.map').length === 0) {
    //   this.$('.businesses').prepend($('<div>').addClass('map'));
    //   this.$('.map').html(this.map.$el);
    // }

    return this;
  },

  addBusiness: function (business) {
    var view = new Yup.Views.BusinessIndexItem({
      model: business,
      review: business.reviews().first(),
      searchPage: this,
      index: this.collection.indexOf(business)
    });

    this.addSubview('.businesses', view);
  },

  addBusinesses: function () {
    var that = this;
    this.collection.each(function (business, index) {
      var view = new Yup.Views.BusinessIndexItem({
        model: business,
        review: business.reviews().first(),
        searchPage: that,
        index: index
      });
      that.addSubview('.businesses', view);
    });

    this.render();
  },

  renderCategories: function () {
    var that = this;
    this.categories.forEach(function (category) {
      var view = new Yup.Views.CategoryIndexItem({
        category: category
      });
      that.addSubview('.categories', view);
    });
  },

  switchBusinesses: function (event) {
    var category = $(event.currentTarget).text().trim();
    Backbone.history.navigate("search/" + category, { trigger: true });
  }
});
