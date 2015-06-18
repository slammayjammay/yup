YelpClone.Views.UserIndexItem = Backbone.View.extend({
  className: "begin",
  template: JST['users/index_item'],
  events: {
    "click": "redirectToUser"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass('user-index-item');
    setTimeout(function () {
      this.$el.removeClass('begin');
    }.bind(this), 0)
  },

  redirectToUser: function (event) {
    Backbone.history.navigate("users/" + this.model.get('id'), { trigger: true });
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
