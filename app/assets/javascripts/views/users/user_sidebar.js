yup.Views.UserSidebar = Backbone.CompositeView.extend({
  template: JST['users/sidebar'],
  events: {
    "click .follow": "follow",
    "click .unfollow": "unfollow"
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model, "sync", this.addFollowButton);
  },

  addFollowButton: function () {
    if (this.model.get('follow_id')) {
      this.$('button').addClass('unfollow');
      this.$('button').text('Unfollow ' + this.model.escape('first_name'));
    } else {
      this.$('button').addClass('follow');
      this.$('button').text('Follow ' + this.model.escape('first_name'));
    }
  },

  follow: function () {
    this.$('button').removeClass('follow');
    var follow = new yup.Models.Following({
      follower_id: CURRENT_USER_ID,
      followed_id: this.model.get('id')
    });

    follow.save({}, { success: function () {
      this.model.set('follow_id', follow.get('id'));
      this.model.followers().length += 1;
      this.render();
    }.bind(this)});
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.addFollowButton();
    return this;
  },

  unfollow: function () {
    this.$('button').removeClass('unfollow');
    var following = new yup.Models.Following({
      id: this.model.get('follow_id')
    });
    following.fetch({ success: function () {
      following.destroy();
      this.model.unset('follow_id');
      this.model.followers().length -= 1;
      this.render();
    }.bind(this)});
  }
});
