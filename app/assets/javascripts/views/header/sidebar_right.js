Yup.Views.SidebarRight = Backbone.View.extend({
  template: JST['header/sidebar_right'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
