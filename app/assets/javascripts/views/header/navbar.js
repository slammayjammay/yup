YelpClone.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
