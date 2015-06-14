YelpClone.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/followers'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.addFollowers);
  },

  addFollowers: function () {
    this.model.followers().each(function (follower) {
      var view = new YelpClone.Views.UserIndexItem({ model: follower });
      this.addSubview('.followers', view);
    }.bind(this));
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
