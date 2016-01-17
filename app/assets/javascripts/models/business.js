Yup.Models.Business = Backbone.Model.extend({
  urlRoot: "/api/businesses",

  address: function () {
    if (!this._address) return [];
    return this._address;
  },

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews)
    }

    if (!response.image_url) {
      this.set(
        'image_url',
        'http://i.ebayimg.com/00/s/Mzg2WDUxOA==/z/6scAAOSwiwVWTkQp/$_35.JPG'
      );
    }

    if (response.location) {
      this._address = response.location.hash.display_address;
    }

    return response;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new Yup.Collections.Reviews();
    }

    return this._reviews;
  }
});
