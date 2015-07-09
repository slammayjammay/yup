Yup.Views.CategoryIndexItem = Backbone.View.extend({
  className: "category-index-item",
  template: JST['search/category_index_item'],

  initialize: function (options) {
    this.category = options.category;
    this.glyph = options.glyph;
  },

  render: function () {
    var content = this.template({
      category: this.category,
      glyph: this.glyph
    });
    this.$el.html(content);
    return this;
  }
});
