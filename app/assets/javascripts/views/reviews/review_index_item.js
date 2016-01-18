Yup.Views.ReviewIndexItem = Backbone.View.extend({
  template: JST['reviews/index_item'],
  className: "review-item",
  events: {
    'click .user-info a': 'redirectToUser'
  },

  initialize: function () {
    this.business = new Yup.Models.Business({
      id: this.model.get('business_id')
    });
    this.business.fetch();
    this.listenTo(this.business, 'sync', this.render);

    this.$el.addClass('begin');
    setTimeout(function () {
      this.$el.removeClass('begin');
    }.bind(this), 100);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  redirectToUser: function (event) {
    if (this.model.isYelpReview) {
      event.preventDefault();
      var imageUrl = encodeURIComponent(this.model.user().get('image_url'));
      Backbone.history.navigate(
        'users/' + this.model.user().get('name') + '/' + imageUrl,
        { trigger: true }
      );
    }
  },

  render: function () {
    // if (this.user.get('follow_id')) {
    //   this.$('user-info').prepend('<div>').addClass('glyphicon glyphicon-ok');
    // }
    var content = this.template({
      business: this.business,
      followed_user: false,
      review: this.model,
      timeCreated: this.model.getTimeCreated(),
      userId: this.model.user().get('id'),
      userImageUrl: this.model.user().get('image_url'),
      userName: this.model.user().get('name')
    });
    this.$el.html(content);
    this.displayRating();
    return this;
  },
});
