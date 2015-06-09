YelpClone.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    var view = new YelpClone.Views.UserSidebar({
      model: this.model
    });
    this.addSubview('.user-sidebar', view, false);

    return this;
  }
});
