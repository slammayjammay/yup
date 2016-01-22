Yup.Views.UserIndexItem = Backbone.View.extend({
  className: "begin",
  template: JST['users/index_item'],
  events: {
    "click": "redirectToUser"
  },

  initialize: function (options) {
    this.$el.addClass('user-index-item');
    setTimeout(function () {
      this.$el.removeClass('begin');
    }.bind(this), 0)
  },

  redirectToUser: function (event) {
    if (this.model.isYelpUser) {
      event.preventDefault();
      var imageUrl = encodeURIComponent(this.model.get('user_image'));
      Backbone.history.navigate(
        'users/' + this.model.get('name') + '/' + imageUrl
      );
    } else {
      Backbone.history.navigate(
        'users/' + this.model.get('id'),
        { trigger: true }
      );
    }
  },

  render: function () {
    var content = this.template({
      userName: this.model.get('name'),
      userImage: this.model.get('image_url')
    });
    this.$el.html(content);
    return this;
  }
});
