Yup.Views.UserIndexItem = Backbone.View.extend({
  className: "begin",
  template: JST['users/index_item'],
  events: {
    "click": "redirectToUser"
  },

  initialize: function (options) {
    if (options.yelpUser) {
      this.userName = this.model.name;
      this.userImage = this.model.image_url
    } else {
      this.listenTo(this.model, "sync", this.render);
    }
    
    this.$el.addClass('user-index-item');
    setTimeout(function () {
      this.$el.removeClass('begin');
    }.bind(this), 0)
  },

  redirectToUser: function (event) {
    Backbone.history.navigate("users/" + this.model.get('id'), { trigger: true });
  },

  render: function () {
    var content = this.template({
      userName: this.userName || this.model.get('name'),
      userImage: this.userImage || this.model.get('image_url')
    });
    this.$el.html(content);
    return this;
  }
});
