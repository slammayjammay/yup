YelpClone.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderReviews);
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

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1)
    $("#input-id").rating({ disabled: true });
    $("#input-id").rating('update', rating);
    // $("#input-id").rating({'size':'lg'});
  }
});
