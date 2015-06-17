YelpClone.Views.Navbar = Backbone.View.extend({
  template: JST['header/navbar'],
  events: {
    "click button.sign-out": "signOut",
    "submit form.navbar-form": "search"
  },

  initialize: function (options) {
    this.router = options.router;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function (event) {
    event.preventDefault();
    var searchKeys = $(event.currentTarget).find('.form-control').val();
    Backbone.history.navigate("#search/" + searchKeys, { trigger: true });
  },

  signOut: function (event) {
    event.preventDefault();
    $.ajax({ url: 'api/users/' + CURRENT_USER_ID, type: 'DELETE' });
    window.location = "session/new";
  }
});
