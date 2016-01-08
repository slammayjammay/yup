Yup.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.addReviews);
    this.listenToOnce(this.model, "sync", this.renderMap);
  },

  addReviews: function (business) {
    business.yelpReviews().each(function (review) {
      var view = new Yup.Views.ReviewIndexItem({
        model: review,
        business: this.model
      });
      this.addSubview('.business-reviews', view);
    }.bind(this));
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  render: function () {
    var content = this.template({
      business: this.model,
      location: this.model.address(),
      image_url: this.model.largeImageUrl(),
      reviews: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    this.displayRating();
    return this;
  },

  renderForm: function () {
    var view = new Yup.Views.ReviewForm({
      model: this.model
    });
    $('body').prepend(view.render().$el);
  },

  renderMap: function () {
    var mapView = new Yup.Views.MapShow({
      collection: new Yup.Collections.Businesses([this.model])
    });
    mapView.init({ maxZoom: 16 });
    this.$('#map').prepend(mapView.$el);
  }
});
