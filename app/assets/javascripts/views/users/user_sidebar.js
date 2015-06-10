YelpClone.Views.UserSidebar = Backbone.CompositeView.extend({
  template: JST['users/sidebar'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    console.log('test');
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
