YelpClone.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderReviews);
    this.listenTo(this.model.reviews(), "add", this.addReview);
  },

  addReview: function (review) {
    var view = new YelpClone.Views.ReviewIndexItem({ model: review });
    this.unshiftSubview('.business-reviews', view);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    this.displayRating();
    return this;
  },

  renderReviews: function () {
    var that = this;
    this.model.reviews().each(function (review) {
      var view = new YelpClone.Views.ReviewIndexItem({ model: review });
      that.unshiftSubview('.business-reviews', view);
    });
  },

  renderForm: function () {
    var view = new YelpClone.Views.ReviewForm({
      model: this.model
    });
    $('body').prepend(view.render().$el);
  }
});
