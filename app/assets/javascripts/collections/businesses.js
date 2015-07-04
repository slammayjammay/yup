Yup.Collections.Businesses = Backbone.Collection.extend({
  url: "/api/businesses",
  model: Yup.Models.Business,

  parse: function (response) {
    this.page = parseInt(response.page);
    return response.businesses;
  }
});
