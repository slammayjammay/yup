YelpClone.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.map = new YelpClone.Views.MapTest({ model: this.model });
    setTimeout(function () {
      this.$('.map').html(this.map.$el);
      this.map.initBusinessMap();
    }.bind(this), 1000);

    // google.maps.event.addDomListener(window, 'load', this.renderMap);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addReview);
    this.listenTo(this.collection, "add", this.displayRating);
  },

  addReview: function (review) {
    var view = new YelpClone.Views.ReviewIndexItem({
      model: review,
      className: "user review-item"
    });
    this.addSubview('.business-reviews', view);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  renderMap: function () {
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
  }
});
