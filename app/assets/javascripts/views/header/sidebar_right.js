Yup.Views.SidebarRight = Backbone.CompositeView.extend({
  template: JST['header/sidebar_right'],
  id: 'sidebar-right',

  initialize: function (options) {
    this.query = options.query;
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
