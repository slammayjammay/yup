YelpClone.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST['home/home_index'],

  initialize: function () {
    this.renderCategories();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.renderBusinesses);
  },

  render: function () {
    var content = this.template({ businesses: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderBusinesses: function () {
    var that = this;
    this.collection.each(function (business) {
      var view = new YelpClone.Views.BusinessIndexItem({
        model: business
      });
      that.addSubview('.businesses', view);
    });
  },

  renderCategories: function () {
    var categories = ['Restaurants', 'Food', 'Nightlife', 'Shopping',
                       'Bars', 'Coffee', 'Health'];
    var that = this;
    categories.forEach(function (category) {
      var view = new YelpClone.Views.CategoryIndexItem({
        category: category
      });
      that.addSubview('.categories', view);
    });
  }
});
