YelpClone.Views.HomeIndex = Backbone.View.extend({
  template: JST['home/home_index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
