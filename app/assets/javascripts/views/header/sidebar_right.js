Yup.Views.SidebarRight = Backbone.CompositeView.extend({
  template: JST['header/sidebar_right'],
  id: 'sidebar-right',

  initialize: function (options) {
    this.query = options.query;

    // this.categories = [['restaurants', 'cutlery'], ['food', 'ice-lolly-tasted'],
    //   ['nightlife', 'glass'], ['bars', 'glass'], ['shopping', 'shopping-cart'],
    //   ['coffee', 'cutlery'], ['health', 'plus'], ['pets', 'home']];
  },

  render: function () {
    var content = this.template({ order: this.order });
    this.$el.html(content);
    this.attachSubviews();
    this.renderMap();
    return this;
  },

  renderMap: function () {
    this.mapView = new Yup.Views.MapShow({
      collection: this.collection
    });
    this.mapView.init();
    this.$('#map').html(this.mapView.$el);
  }
});
