Yup.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.map = new Yup.Views.MapShow({
      collection: new Yup.Collections.Businesses([this.model])
    });
    setTimeout(function () {
      this.$('.map').prepend(this.map.$el);
      this.map.initDefaultMap();
      // this.map.addBusinessMarkers();
      var picture = this.map.map.getStreetView();
      var pos = new google.maps.LatLng(
        this.model.get('latitude'),
        this.model.get('longitude')
      );
      picture.setPosition(pos);
      picture.setVisible(true);
    }.bind(this), 1000);

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addReview);
    this.listenTo(this.collection, "add", this.displayRating);
  },

  addReview: function (review) {
    var view = new Yup.Views.ReviewIndexItem({
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
    var view = new Yup.Views.ReviewForm({
      model: this.model
    });
    $('body').prepend(view.render().$el);
  }
});
