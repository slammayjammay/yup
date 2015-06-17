YelpClone.Views.UserReviews = Backbone.CompositeView.extend({
  template: JST['users/reviews'],
  events: {
    "click button": "redirectToSearch"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderReviews);
    this.renderReviews();
  },

  redirectToSearch: function () {
    Backbone.history.navigate("search", { trigger: true });
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
        className: "business review-item"
      });

      that.addSubview('.user-reviews', view);
    });
  },
});
