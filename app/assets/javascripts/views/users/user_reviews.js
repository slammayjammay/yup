Yup.Views.UserReviews = Backbone.CompositeView.extend({
  template: JST['users/reviews'],
  events: {
    "click button": "redirectToSearch"
  },

  initialize: function () {
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
    this.collection.each(function (review) {
      var view = new Yup.Views.ReviewIndexItem({
        model: review
      });

      this.addSubview('.user-reviews', view);
    }.bind(this));
  },
});
