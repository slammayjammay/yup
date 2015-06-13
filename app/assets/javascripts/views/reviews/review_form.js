YelpClone.Views.ReviewForm = Backbone.View.extend({
  className: "backdrop",
  template: JST['reviews/form'],
  events: {
    "submit form": "save",
    "click button.close": "close"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  close: function (event) {
    event.preventDefault();
    this.remove();
  },

  displayRating: function () {
    this.$("#input-id").rating();
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    this.$('#input-id').on('rating.change', function (e, v, c) {
      this.rating = parseFloat(v);
    }.bind(this));

    setTimeout(function () {
      this.$('form').attr('class', 'review-form');
    }.bind(this), 0);
    this.displayRating();
    return this;
  },

  save: function (event) {
    event.preventDefault();
    var review = new YelpClone.Models.Review({ rating: this.rating });
    review.set('content', this.$('textarea').val());
    review.set('business_id', this.model.get('id'));

    var that = this;
    review.save({}, { success: function () {
      that.model.reviews().add(review);
      that.remove();
      Backbone.history.navigate(
        "businesses/" + that.model.get('id'),
        { trigger: true }
      );
    }});
  }
});
