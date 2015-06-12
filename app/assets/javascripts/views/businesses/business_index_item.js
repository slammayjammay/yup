YelpClone.Views.BusinessIndexItem = Backbone.View.extend({
  className: "business-index-item",
  template: JST['businesses/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    return this;
  }
});
