YelpClone.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],
  events: {
    "click button.home": "redirectToHome",
    "submit form": "search",
    "click button.sign-out": "signOut"
  },

  initialize: function (options) {
    this.router = options.router;
  },

  redirectToHome: function () {
    Backbone.history.navigate("#home", { trigger: true });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function (event) {
    event.preventDefault();
    var searchKeys = $(event.currentTarget).find('.form-control').val();
    Backbone.history.navigate("#search");
    this.router._search(searchKeys);
  },

  signOut: function () {
    $.ajax({ url: "/session", type: "DELETE" });
  }
});
