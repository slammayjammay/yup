YelpClone.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],
  events: {
    "click button.home": "redirectToHome",
    "click button.sign-out": "signOut"
  },

  redirectToHome: function () {
    Backbone.history.navigate("#home", { trigger: true });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  signOut: function () {
    $.ajax({ url: "/session", type: "delete" });
  }
});
