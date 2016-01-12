Yup.Models.Business = Backbone.Model.extend({
  urlRoot: "/api/businesses",

  address: function () {
    if (this._address) return this._address;
    return [];
  },

  largeImageUrl: function () {
    return this._largeImageUrl;
  },

  parse: function (response) {
    if (response.yelp_reviews) {
      this.yelpReviews().set(response.yelp_reviews)
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

  yelpReviews: function () {
    if (!this._yelpReviews) {
      this._yelpReviews = new Yup.Collections.Reviews();
    }

    return this._yelpReviews;
  }
});
