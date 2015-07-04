yup.Models.User = Backbone.Model.extend({
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

    if (response.follows) {
      this.follows().set(response.follows)
      delete response.follows;
    }

    return response;
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new yup.Collections.Users();
    }

    return this._followers;
  },

  follows: function () {
    if (!this._follows) {
      this._follows = new yup.Collections.Users();
    }

    return this._follows;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new yup.Collections.Reviews();
    }

    return this._reviews;
  }
});
