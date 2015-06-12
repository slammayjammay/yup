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
    $("#input-id").rating();
    $("#input-id").rating({'size':'lg'});
  }
});
