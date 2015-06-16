YelpClone.Views.CategoryIndexItem = Backbone.View.extend({
  className: "category-index-item",
  template: JST['home/category_index_item'],

  initialize: function (options) {
    this.category = options.category;
  },

  render: function () {
    var content = this.template({ category: this.category });
    this.$el.html(content);
    return this;
  }
});
