YelpClone.Views.SearchShow = Backbone.CompositeView.extend({
  className: 'search-show',
  template: JST['search/search_show'],
  events: {
    "click .category-index-item": "switchBusinesses",
    "click .filter": "filter"
  },

  initialize: function (options) {
    this.router = options.router;
    this.query = options.query;
    this.categories = ['restaurants', 'food', 'nightlife', 'shopping',
      'bars', 'coffee', 'health'];
    this.renderCategories();

    this.listenTo(this.collection, "sync add", this.render);
    this.listenTo(this.collection, "sync", this.addBusinesses.bind(this));
    this.listenTo(this.collection, "sync", this.renderMap);
  },

  filter: function (event) {
    var order = $(event.currentTarget).find('input').attr('class');
    Backbone.history.navigate("search");
    this.router.search(this.query, order);
  },

  render: function () {
    var content = this.template({
      businesses: this.collection,
      query: this.query
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBusinesses: function () {
    var that = this;
    this.collection.each(function (business) {
        var view = new YelpClone.Views.BusinessIndexItem({
          model: business,
          review: business.reviews().first()
        });
        that.addSubview('.businesses', view);
    });

    this.render();
  },

  renderCategories: function () {
    var that = this;
    this.categories.forEach(function (category) {
      var view = new YelpClone.Views.CategoryIndexItem({
        category: category
      });
      that.addSubview('.categories', view);
    });
  },

  renderMap: function () {
    new YelpClone.Views.MapShow({ collection: this.collection });
  },

  switchBusinesses: function (event) {
    var category = $(event.currentTarget).text().trim();
    Backbone.history.navigate("search");
    this.router.search(category);
  }
});
