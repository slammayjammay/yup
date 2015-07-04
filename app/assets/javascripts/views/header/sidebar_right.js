Yup.Views.SidebarRight = Backbone.CompositeView.extend({
  template: JST['header/sidebar_right'],

  initialize: function (options) {
    this.map = options.map;
    setTimeout(function () {
      this.map.initDefaultMap();
      this.$('.map').html(this.map.$el);
    }.bind(this), 1000);

    this.categories = ['restaurants', 'food', 'nightlife', 'shopping',
      'bars', 'coffee', 'health'];
    this.renderCategories();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderCategories: function () {
    var that = this;
    this.categories.forEach(function (category) {
      var view = new Yup.Views.CategoryIndexItem({
        category: category
      });
      that.addSubview('.categories', view);
    });
  }
});
