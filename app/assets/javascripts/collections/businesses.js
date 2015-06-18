YelpClone.Collections.Businesses = Backbone.Collection.extend({
  url: "/api/businesses",
  model: YelpClone.Models.Business,

  parse: function (response) {
    this.page = response.page;
    this.total_pages = response.total_pages;
    return response.businesses;
  }
});
