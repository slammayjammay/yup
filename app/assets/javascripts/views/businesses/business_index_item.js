Yup.Views.BusinessIndexItem = Backbone.View.extend({
  className: "business-index-item",
  template: JST['businesses/index_item'],

  initialize: function (options) {
    if (options.mini) {
      this.template = JST['businesses/mini_item'];
      this.$el.attr('class', 'business-mini-item');
    }

    this.$el.attr('id', options.index);
    this.$el.attr('style', 'transform: translateX(' + (10 + Math.floor(Math.random() * 150)) + '%);');

    setTimeout(function () {
      this.$el.removeAttr('style');
    }.bind(this), 90);
  },

  getNumReviews: function () {
    var numReviews = '(' + this.model.get('review_count') + ' review';
    if (numReviews !== 1) numReviews += 's';
    numReviews += ')';
    return numReviews;
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  render: function () {
    var content = this.template({
      id: this.model.get('id'),
      imageUrl: this.model.get('image_url'),
      name: this.model.get('name'),
      numReviews: this.getNumReviews(),
      review: this.review,
      snippet: this.model.get('snippet_text')
    });

    this.$el.html(content);
    this.displayRating();
    return this;
  }
});
