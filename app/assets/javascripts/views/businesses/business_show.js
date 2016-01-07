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

  getBusinessAddress: function () {
    if (!this.model.get('location')) return;

    var street = this.model.get('location').hash.address[0];
    var city = this.model.get('location').hash.city;
    var country = this.model.get('location').hash.country_code;
    return street + ', ' + city + ', ' + country;
  },

  getBusinessImage: function () {
    if (!this.model.get('location')) return;

    var image_url = this.model.get('image_url');
    var reg = /\/([a-zA-Z]*)\.jpg/;
    var pictureSize = image_url.match(reg)[1];

    return image_url.replace(pictureSize, 'o');
  },

  render: function () {
    var content = this.template({
      business: this.model,
      location: this.getBusinessAddress(),
      image_url: this.getBusinessImage(),
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
    this.map = new Yup.Views.MapShow({
      collection: new Yup.Collections.Businesses([this.model])
    });
    this.map.initDefaultMap();
    this.$('.map').prepend(this.map.$el);
  }
});
