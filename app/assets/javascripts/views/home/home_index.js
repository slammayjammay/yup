YelpClone.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST['home/home_index'],
  events: {
    "click .category-index-item": "switchBusinesses"
  },

  initialize: function (options) {
    this.router = options.router;
    this.categories = ['restaurants', 'food', 'nightlife', 'shopping',
                       'bars', 'coffee', 'health'];
    this.renderCategories();
    this.listenTo(this.collection, "sync add", this.render);
    this.listenTo(this.collection, "sync", this.addBusinesses.bind(this));
  },

  render: function () {
    var content = this.template({ businesses: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBusinesses: function (category) {
    var that = this;
    this.collection.each(function (business) {
      // if (business.get('category') === category) {
        var view = new YelpClone.Views.BusinessIndexItem({
          model: business,
          review: business.reviews().first()
        });
        that.addSubview('.businesses', view);
      // }
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

  switchBusinesses: function (event) {
    var category = $(event.currentTarget).text().trim();
    Backbone.history.navigate("search");
    this.router._search(category);
    // var subviews = _.map(this.subviews('.businesses'), _.clone);
    // var that = this;
    // subviews[0].forEach(function (view) {
    //   that.removeSubview('.businesses', view);
    // });
    //
    // this.addBusinesses(category);
  }
});
