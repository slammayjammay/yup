Yup.Views.BestOf = Backbone.View.extend({
  template: JST['best_of/best_of'],
  id: 'best-of',

  render: function () {
    var content = this.template();
    this.$el.html(content)
    return this;
  }
});
