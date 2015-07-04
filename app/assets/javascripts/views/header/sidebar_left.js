Yup.Views.SidebarLeft = Backbone.View.extend({
  template: JST['header/sidebar_left'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  }
})
