YelpClone.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],
  // events: {
  //   "submit form": "search"
  // },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  // search: function (event) {
  //   event.preventDefault();
  //   var searchKeys = $(event.currentTarget).find('input').val();
  // }
});
