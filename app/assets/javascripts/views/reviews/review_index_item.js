YelpClone.Views.ReviewIndexItem = Backbone.View.extend({
  className: "review-item",
  template: JST['reviews/index_item'],

  initialize: function () {
    this.user = new YelpClone.Models.User({ id: this.model.get('user_id') });
    this.user.fetch();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      review: this.model,
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
});
