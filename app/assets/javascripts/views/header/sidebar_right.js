Yup.Views.SidebarRight = Backbone.View.extend({
  template: JST['header/sidebar_right'],

  initialize: function (options) {
    this.map = options.map;
    setTimeout(function () {
      this.map.initDefaultMap();
      this.$('.map').html(this.map.$el);
    }.bind(this), 1000);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
