YelpClone.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews)
      delete response.reviews;
    }

    return response;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new YelpClone.Collections.Reviews();
    }

    return this._reviews;
  }
});
