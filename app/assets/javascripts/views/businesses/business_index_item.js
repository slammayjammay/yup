YelpClone.Views.BusinessIndexItem = Backbone.View.extend({
  className: "business-index-item",
  template: JST['businesses/index_item'],
  events: {
    "click": "redirect"
  },

  initialize: function (options) {
    this.index = options.index;
    this.$el.attr('style', 'transform: translateX(' + (50 + this.index * 50) + '%);')
    setTimeout(function () {
      this.$el.removeAttr('style');
    }.bind(this), 0);
    this.listenTo(this.model, "sync", this.render);
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
