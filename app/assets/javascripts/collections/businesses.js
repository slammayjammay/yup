YelpClone.Collections.Businesses = Backbone.Collection.extend({
  url: "/api/businesses",

  model: YelpClone.Models.Business
});
