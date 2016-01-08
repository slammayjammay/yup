Yup.Models.Business = Backbone.Model.extend({
  urlRoot: "/api/businesses",

  address: function () {
    return this._address;
  },

  largeImageUrl: function () {
    return this._largeImageUrl;
  },

  parse: function (response) {
    if (response.yelp_reviews) {
      this.yelpReviews().set(response.yelp_reviews)
      delete response.yelp_reviews;
    }

    if (response.image_url) {
      // Get the large version of image_url. Urls take the form of .../ms.jpg.
      // Replace ms with o to get the original size of the image.
      this._largeImageUrl = response.image_url.slice().replace('ms.jpg', 'o.jpg');

      delete response.image_url;
    } else {
      this.set(
        'image_url',
        'http://i.ebayimg.com/00/s/Mzg2WDUxOA==/z/6scAAOSwiwVWTkQp/$_35.JPG'
      );
    }

    if (response.location) {
      var street = response.location.hash.address[0];
      var city = response.location.hash.city;
      var country = response.location.hash.country_code;
      this._address = street + ', ' + city + ', ' + country;
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
