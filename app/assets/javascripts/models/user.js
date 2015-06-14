YelpClone.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews)
      delete response.reviews;
    }

    if (response.followers) {
      this.followers().set(response.followers)
      delete response.followers;
    }

    return response;
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new YelpClone.Collections.Users();
    }

    return this._followers;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new YelpClone.Collections.Reviews();
    }

    return this._reviews;
  }
});
