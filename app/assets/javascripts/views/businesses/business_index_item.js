YelpClone.Views.BusinessIndexItem = Backbone.View.extend({
  className: "begin business-index-item",
  template: JST['businesses/index_item'],
  events: {
    "click": "redirect"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    setTimeout(function () {
      this.$el.removeClass('begin');
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
    var content = this.template({
      business: this.model
    });

    this.$el.html(content);
    this.displayRating();
    return this;
  }
});
