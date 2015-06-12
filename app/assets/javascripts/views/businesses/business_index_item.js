YelpClone.Views.BusinessIndexItem = Backbone.View.extend({
  className: "business-index-item",
  template: JST['businesses/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    this.displayRating();
    return this;
  },

  displayRating: function () {
    debugger
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  }
});
