Yup.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  followers: function () {
    if (!this._followers) {
      this._followers = new Yup.Collections.Users();
    }

    return this._followers;
  },

  follows: function () {
    if (!this._follows) {
      this._follows = new Yup.Collections.Users();
    }

    return this._follows;
  },

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
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

    if (response.isYelpUser) {
      this.isYelpUser = true;
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
