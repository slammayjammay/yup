Yup.Views.ReviewIndexItem = Backbone.View.extend({
  template: JST['reviews/index_item'],
  className: "review-item",
  events: {
    'click .user-info a': 'redirectToUser'
  },

  initialize: function (options) {
    this.yelpUser = options.yelpUser;

    this.business = new Yup.Models.Business({
      id: this.model.get('business_id')
    });
    this.business.fetch();

    // If this model is a yup review, we need to fetch the correct user and
    // store the info in an instance variable. Otherwise, this model has all
    // relevant user info.
    if (this.model.isYupReview()) {
      this.userInfo = {}; // avoid rendering issues
      this.user = new Yup.Models.User({ id: this.model.get('user_id') });
      this.user.fetch({
        success: this.getUserInfo.bind(this, true)
      });
      this.listenTo(this.user, "sync", this.render);
    } else {
      this.getUserInfo();
    }

    this.$el.addClass('begin');
    setTimeout(function () {
      this.$el.removeClass('begin');
    }.bind(this), 100);
  },

  getUserInfo: function (isYupReview) {
    var user = isYupReview ? this.user.attributes : this.model.get('user').hash;
    this.userInfo = {
      id: user.id,
      imageUrl: user.image_url,
      name: user.name
    };

    if (this.yelpUser) {
      this.userInfo.name = this.yelpUser.get('name');
      this.userInfo.imageUrl = this.yelpUser.get('image_url');
    }
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  redirectToUser: function (event) {
    if (!this.model.isYupReview()) {
      event.preventDefault();
      var imageUrl = encodeURIComponent(this.userInfo.imageUrl);
      Backbone.history.navigate(
        'yelpUsers/' + this.userInfo.name + '/' + imageUrl,
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
      userId: this.userInfo.id,
      userImageUrl: this.userInfo.imageUrl,
      userName: this.userInfo.name
    });
    this.$el.html(content);
    this.displayRating();
    return this;
  },
});
