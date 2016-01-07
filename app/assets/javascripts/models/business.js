Yup.Models.Business = Backbone.Model.extend({
  urlRoot: "/api/businesses",

  parse: function (response) {
    if (response.yelp_reviews) {
      this.yelpReviews().set(response.yelp_reviews)
      delete response.yelp_reviews;
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
