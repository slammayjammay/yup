Yup.Views.UserReviews = Backbone.CompositeView.extend({
  template: JST['users/reviews'],
  events: {
    "click button": "redirectToSearch"
  },

  initialize: function (options) {
    if (options.isYelpUser) {
      this.listenTo(this.collection, 'sync', this.seedReviews);
    } else {
      this.listenTo(this.collection, 'add', this.addReview);
    }
  },

  addReview: function (review) {
    var view = new Yup.Views.ReviewIndexItem({ model: review });
    this.addSubview('.user-reviews', view);
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

  seedReviews: function () {
    this.collection.each(function (review) {
      var view = new Yup.Views.ReviewIndexItem({
        model: review,
        yelpUser: this.model
      });

      this.addSubview('.user-reviews', view);
    }.bind(this));
  }
});
