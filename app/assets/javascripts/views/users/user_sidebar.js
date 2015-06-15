YelpClone.Views.UserSidebar = Backbone.CompositeView.extend({
  template: JST['users/sidebar'],
  events: {
    "click .follow": "follow"
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  follow: function () {
    var follow = new YelpClone.Models.Following({
      follower_id: CURRENT_USER_ID,
      followed_id: this.model.get('id')
    });

    follow.save({}, { success: function () {
      this.model.followers().add(follow);
      this.render();
    }.bind(this)});
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
