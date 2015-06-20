YelpClone.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['feed/show'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addReview);
  },

  addReview: function (review) {
    var view = new YelpClone.Views.FeedIndexItem({ model: review });
    this.addSubview('.feed-items', view);
  },

  render: function () {
    debugger
    var content = this.template({ reviews: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
