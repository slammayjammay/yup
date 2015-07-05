Yup.Views.SidebarRight = Backbone.CompositeView.extend({
  template: JST['header/sidebar_right'],

  events: {
    // 'click .filter': 'filter',
    'click .category-index-item': 'search'
  },

  initialize: function () {
    this.map = new Yup.Views.MapShow({
      collection: this.collection
    });
    this.addSubview('.map', this.map);
    setTimeout(function () {
      this.map.initDefaultMap();
      this.$('.map').html(this.map.$el);
    }.bind(this), 0);

    this.categories = ['restaurants', 'food', 'nightlife', 'shopping',
      'bars', 'coffee', 'health'];
    this.renderCategories();
  },

  filter: function (event) {
    var order = $(event.currentTarget).find('input').attr('class');
    this.search(this.query, order);
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
  },

  search: function (event) {
    var category = $(event.currentTarget).text().trim();
    Backbone.history.navigate("search/" + category, { trigger: true });
  }
});
