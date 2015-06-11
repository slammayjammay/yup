YelpClone.Views.ReviewIndexItem = Backbone.View.extend({
  className: "review-item",
  template: JST['reviews/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    return this;
  }
});
