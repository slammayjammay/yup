Yup.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],
  events: {
    "click button.sign-out": "signOut",
    "submit form.navbar-form": "search",
    "click .logo": "redirectToFeed",
    "click .to-feed": "redirectToFeed",
    "click .to-bestof": "redirectToBestOf",
    "click .to-account": "redirectToProfile"
  },

  initialize: function (options) {
    this.router = options.router;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  redirectToBestOf: function () {
    Backbone.history.navigate("search/bestof", { trigger: true });
  },

  redirectToFeed: function () {
    Backbone.history.navigate("feed", { trigger: true });
  },

  redirectToProfile: function () {
    Backbone.history.navigate("users/" + CURRENT_USER_ID, { trigger: true });
  },

  search: function (event) {
    event.preventDefault();
    var searchKeys = $(event.currentTarget).find('.form-control').val();
    Backbone.history.navigate("search/" + searchKeys, { trigger: true });
  },

  signOut: function (event) {
    event.preventDefault();
    $.ajax({ url: 'api/users/' + CURRENT_USER_ID, type: 'DELETE' });
    window.location = "session/new";
  }
});
