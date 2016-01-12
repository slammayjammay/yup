Yup.Views.BusinessIndexItem = Backbone.View.extend({
  className: "business-index-item",
  template: JST['businesses/index_item'],

  initialize: function (options) {
    this.review = options.review;
    this.$el.attr('id', options.index);

    this.user = new Yup.Models.User();
    if (this.review) {
      this.user.set('id', this.review.get('user_id'));
      this.user.fetch({ success: function () {
        this.render();
      }.bind(this)});
    }

    this.$el.attr('style', 'transform: translateX(' + (50 + Math.floor(Math.random() * 150)) + '%);');
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
      business: this.model,
      numReviews: this.getNumReviews(),
      review: this.review,
      user: this.user
    });

    this.$el.html(content);
    this.displayRating();
    return this;
  }
});
