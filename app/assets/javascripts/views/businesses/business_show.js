YelpClone.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click button": "review"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderReviews);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    $("#input-id").rating({ disabled: true });
    $("#input-id").rating('update', rating);
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.displayRating();
    return this;
  },

  renderReviews: function () {
    var that = this;
    this.model.reviews().each(function (review) {
      var view = new YelpClone.Views.ReviewIndexItem({ model: review });
      that.addSubview('.business-reviews', view);
    });
  },

  review: function () {
    var view = new YelpClone.Views.ReviewForm({
      model: this.model
    });
    this.$('.review-form').html(view.render().$el);
  }
});
