YelpClone.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['feed/show'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
  debugger
    var content = this.template({ reviews: this.collection });
    this.$el.html(content);
    return this;
  }
});
