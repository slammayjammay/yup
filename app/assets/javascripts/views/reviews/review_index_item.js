Yup.Views.ReviewIndexItem = Backbone.View.extend({
  template: JST['reviews/index_item'],

  initialize: function () {
    this.user = new Yup.Models.User({ id: this.model.get('user_id') });
    this.user.fetch();

    this.business = new Yup.Models.Business({
      id: this.model.get('business_id')
    });
    this.business.fetch();

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.business, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);

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

  render: function () {
    if (this.user.get('follow_id')) {
      this.$el.addClass('gold');
    }
    var content = this.template({
      review: this.model,
      user: this.user,
      business: this.business
    });
    this.$el.html(content);
    this.displayRating();
    return this;
  },
});
