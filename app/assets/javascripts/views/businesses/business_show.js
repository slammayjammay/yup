YelpClone.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model, "sync", this.renderReviews);
    this.listenTo(this.model, "sync", this.renderMap);
    this.listenTo(this.collection, "add", function () {
      console.log('what is happening...?');
    });
    this.listenTo(this.collection, "add", this.addReview);
    this.listenTo(this.collection, "add", this.displayRating);
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

  renderMap: function () {
    new YelpClone.Views.MapShow({ model: this.model });
  },

  render: function () {
    var content = this.template({
      business: this.model,
      reviews: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    this.displayRating();
    return this;
  },

  renderForm: function () {
    var view = new YelpClone.Views.ReviewForm({
      model: this.model
    });
    $('body').prepend(view.render().$el);
  },

  // renderReviews: function () {
  //   var that = this;
  //   this.collection.each(function (review, index) {
  //     var view = new YelpClone.Views.ReviewIndexItem({
  //       model: review,
  //       index: index
  //     });
  //     that.unshiftSubview('.business-reviews', view);
  //   });
  // },
});
