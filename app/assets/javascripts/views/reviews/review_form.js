YelpClone.Views.ReviewForm = Backbone.View.extend({
  className: "backdrop",
  template: JST['reviews/form'],
  events: {
    "submit form": "save"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  displayRating: function () {
    this.$("#input-id").rating();
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    setTimeout(function () {
      this.$('form').attr('class', 'review-form');
    }.bind(this), 0);
    this.displayRating();
    return this;
  },

  save: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    var review = new YelpClone.Models.Review(data);
    review.set('business_id', this.model.get('id'));

    var that = this;
    review.save({}, { success: function () {
      that.model.reviews().add(review);
      Backbone.history.navigate(
        "businesses/" + that.model.get('id'),
        { trigger: true }
      );
    }});
  }
});
