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

  addReviews: function () {
    this.model.reviews().each(function (review) {
      // make sure all reviews are by this user
      review.user().set('id', this.model.get('id'));
      review.user().set('name', this.model.get('name'));
      review.user().set('image_url', this.model.get('image_url'));

      var view = new Yup.Views.ReviewIndexItem({
        model: review
      });
      this.addSubview('.user-reviews', view);
    }.bind(this));
  },

  getSeedReviews: function () {
    var seedReviews = new Yup.Collections.Reviews();
    seedReviews.fetch({
      url: 'api/reviews/sample',
      data: { limit: 10 },
      success: function (collection, models) {
        this.model.reviews().set(models, { parse: true });
        this.addReviews();
        $('#num-reviews').html(collection.length);
      }.bind(this)
    });
  },

  redirectToSearch: function () {
    Backbone.history.navigate("search", { trigger: true });
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
