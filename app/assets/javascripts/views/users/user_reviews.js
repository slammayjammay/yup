Yup.Views.UserReviews = Backbone.CompositeView.extend({
  template: JST['users/reviews'],
  events: {
    "click button": "redirectToSearch"
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', function () {
      if (this.model.isYelpUser) {
        this.getSeedReviews();
      } else {
        this.addReviews();
      }
    });
  },

  addReviews: function (userData) {
    this.model.reviews().each(function (review) {
      var view = new Yup.Views.ReviewIndexItem({
        model: review,
        userData: userData
      });
      this.addSubview('.user-reviews', view);
    }.bind(this));
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

  getSeedReviews: function () {
    var seedReviews = new Yup.Collections.Reviews();
    seedReviews.fetch({
      url: 'api/reviews/sample',
      data: { limit: 10 },
      success: function (collection, models) {
        this.model.reviews().set(models, { parse: true });
        this.addReviews(this.model);
        $('#num-reviews').html(collection.length);
      }.bind(this)
    });
  }
});
