YelpClone.Views.UserReviews = Backbone.CompositeView.extend({
  template: JST['users/reviews'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.renderReviews();
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderReviews: function () {
    var that = this;
    this.model.reviews().each(function (review, index) {
      var view = new YelpClone.Views.ReviewIndexItem({
        model: review,
        index: index,
        className: "clickable review-item"
      });

      that.addSubview('.user-reviews', view);
    });
  },
});
