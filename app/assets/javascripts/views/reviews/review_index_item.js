YelpClone.Views.ReviewIndexItem = Backbone.View.extend({
  className: "review-item",
  template: JST['reviews/index_item'],

  initialize: function (options) {
    this.user = new YelpClone.Models.User({ id: this.model.get('user_id') });
    this.user.fetch();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);

    this.index = options.index;
    this.$el.attr('style', 'transform: translateX(' + (50 + this.index * 50) + '%);');
    setTimeout(function () {
      this.$el.removeAttr('style');
    }.bind(this), 0);
  },

  render: function () {
    var content = this.template({
      review: this.model,
      user: this.user
    });
    this.$el.html(content);
    this.displayRating();
    return this;
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  }
});
