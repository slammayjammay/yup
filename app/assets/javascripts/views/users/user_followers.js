Yup.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/followers'],

  initialize: function () {
    this.addFollows();
    this.listenTo(this.collection, 'sync', this.seedFollows);
  },

  addFollows: function () {
    this.model.follows().each(function (follower) {
      var view = new Yup.Views.UserIndexItem({ model: follower });
      this.addSubview('#followers', view);
    }.bind(this));

    this.render();
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  seedFollows: function () {
    this.collection.each(function (model) {
      if (model.get('user').hash.name === this.model.get('name')) {
        // make sure followed user is not the same as following user
        return;
      }
      var view = new Yup.Views.UserIndexItem({
        model: model.get('user').hash,
        yelpUser: true
      });
      this.addSubview('#followers', view);
    }.bind(this));
  }
});
