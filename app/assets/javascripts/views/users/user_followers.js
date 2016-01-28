Yup.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/followers'],

  initialize: function (options) {
    this.numFollowing = options.numFollowing;
    this.isLoadingContent = true;

    if (this.model.isYelpUser) {
      this.getSeedFollows();
    } else {
      this.addFollows();
    }
  },

  addFollows: function () {
    var actualNumFollowing = 0;
    this.model.follows().each(function (follower) {
      // make sure follower and followed are not the same user
      if (this.model.get('name') === follower.get('name')) {
        return;
      }

      var view = new Yup.Views.UserIndexItem({ model: follower });
      this.addSubview('#followers', view);

      actualNumFollowing += 1;
    }.bind(this));

    $('#num-following').text(actualNumFollowing);
  },

  getSeedFollows: function () {
    var seedFollows = new Yup.Collections.Users();
    seedFollows.fetch({
      url: 'api/users/sample',
      data: { limit: this.numFollowing },
      success: function (collection, models) {
        this.isLoadingContent = false;
        $('.loading').remove();

        this.model.follows().set(models, { parse: true });
        this.addFollows();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();

    if (this.isLoadingContent) {
      var $loading = new Yup.Views.Loading();
      this.$el.prepend($loading.$el);
    }

    return this;
  }
});
