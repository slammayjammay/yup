YelpClone.Views.BusinessIndexItem = Backbone.View.extend({
  className: "business-index-item",
  template: JST['businesses/index_item'],
  events: {
    "click": "redirect"
  },

  initialize: function (options) {
    this.review = options.review;
    this.user = new YelpClone.Models.User();
    if (this.review) {
      this.user.set('id', this.review.get('user_id'));
      this.user.fetch({ success: function () {
        this.render();
      }.bind(this)});
    }

    this.index = options.index;
    this.$el.attr('style', 'transform: translateX(' + (50 + Math.floor(Math.random() * 150)) + '%);');
    setTimeout(function () {
      this.$el.removeAttr('style');
    }.bind(this), 0);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  redirect: function () {
    Backbone.history.navigate("#businesses/" + this.model.get('id'), { trigger: true });
  },

  render: function () {
    // debugger
    var content = this.template({
      business: this.model,
      review: this.review,
      user: this.user
    });

    this.$el.html(content);
    this.displayRating();
    return this;
  }
});
