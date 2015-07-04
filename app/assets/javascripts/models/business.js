Yup.Models.Business = Backbone.Model.extend({
  urlRoot: "/api/businesses",

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews)
      delete response.reviews;
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
