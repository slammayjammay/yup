YelpClone.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],
  events: {
    "click button.sign-out": "signOut"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  signOut: function () {
    $.ajax({ url: "/session", type: "delete" });
  }

  // search: function (event) {
  //   event.preventDefault();
  //   var searchKeys = $(event.currentTarget).find('input').val();
  // }
});
