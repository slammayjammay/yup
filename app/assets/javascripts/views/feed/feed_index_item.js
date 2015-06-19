YelpClone.Views.FeedIndexItem = Backbone.View.extend({
  className: 'begin',
  template: JST['feed/index_item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    setTimeout(function () {
      this.$el.addClass('feed-index-item');
      this.$el.removeClass('begin');
    }.bind(this), 0);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  render: function () {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    this.displayRating();
    return this;
  }
});
