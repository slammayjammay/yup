YelpClone.Views.SearchShow = Backbone.CompositeView.extend({
  template: JST['search/show'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    var content = this.template({ businesses: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
