YelpClone.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST['home/home_index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    var content = this.template({ businesses: this.collection });
    this.$el.html(content);
    return this;
  }
});
