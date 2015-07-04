yup.Views.UserEdit = Backbone.View.extend({
  className: 'begin',
  template: JST['users/edit'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    setTimeout(function () {
      this.$el.addClass('user-edit').removeClass('begin');
    }.bind(this), 0);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },
});
