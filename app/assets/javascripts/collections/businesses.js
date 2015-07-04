yup.Collections.Businesses = Backbone.Collection.extend({
  url: "/api/businesses",
  model: yup.Models.Business,

  parse: function (response) {
    this.page = parseInt(response.page);
    return response.businesses;
  }
});
