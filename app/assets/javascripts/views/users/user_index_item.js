YelpClone.Views.UserIndexItem = Backbone.View.extend({
  className: "user-index-item",
  template: JST['users/index_item'],
  events: {
    "click": "redirectToUser"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  redirectToUser: function (event) {
    Backbone.history.navigate("users/" + this.model.get('id'), { trigger: true });
    // TODO: is this view still in memory?
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
