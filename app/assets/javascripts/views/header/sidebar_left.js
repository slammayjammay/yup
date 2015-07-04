YelpClone.Views.SidebarLeft = Backbone.View.extend({
  template: JST['header/sidebar_left'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
