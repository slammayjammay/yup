Yup.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenToOnce(this.model, "sync", this.renderMap);
  },

  addReview: function (review) {
    var view = new Yup.Views.ReviewIndexItem({
      model: review,
      className: "user review-item"
    });
    this.addSubview('.business-reviews', view);
  },

  getBusinessAddress: function () {
    if (!this.model.get('location')) return;

    var street = this.model.get('location').hash.address[0];
    var city = this.model.get('location').hash.city;
    var country = this.model.get('location').hash.country_code;
    return street + ', ' + city + ', ' + country;
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
      location: this.getBusinessAddress(),
      reviews: this.collection
    });
    this.$el.html(content);
    // this.attachSubviews();
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
    this.map = new Yup.Views.MapShow({
      collection: new Yup.Collections.Businesses([this.model])
    });
    this.map.initDefaultMap();
    this.$('.map').prepend(this.map.$el);
  }
});
