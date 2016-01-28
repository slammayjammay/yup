Yup.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  id: 'user-show',
  events: {
    "click ul.tabs li": "swapView",
    "submit form": "edit"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', function () {
      this.render();
      this.swapView('reviews');
    });
    this.swapView('reviews');
  },

  changeSelectedTab: function (selector) {
    this.$('li').removeClass('selected');
    this.$('#' + selector).addClass('selected');
  },

  createView: function (selector) {
    if (selector === 'reviews')         this.createReviewsView();
    else if (selector === 'followings') this.createFollowingsView();
    else if (selector === 'edit')       this.createEditView();
  },

  createEditView: function () {
    this.editView = new Yup.Views.UserEdit({ model: this.model });
    this.$('#user-main').html(this.editView.render().$el);
  },

  createFollowingsView: function () {
    this.followingsView = new Yup.Views.UserFollowers({
      model: this.model,
      numFollowing: this.numFollows
    });
    this.$('#user-main').html(this.followingsView.render().$el);
  },

  createReviewsView: function () {
    this.reviewsView = new Yup.Views.UserReviews({
      model: this.model
    });
  },

  edit: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();

    this.model.save(data, {
      success: function () {
        setTimeout(function () {
          this.renderSuccess();
          this.swapView('reviews');
        }.bind(this), 0);
      }.bind(this)
    });
  },

  getNumFollows: function () {
    if (this.model.isYelpUser) {
      this.numFollows = ~~(Math.random() * 15) + 3;
      this.numFollowers = ~~(Math.random() * 15) + 3;
    } else {
      this.numFollows = this.model.follows().length;
      this.numFollowers = this.model.followers().length;
    }
  },

  render: function () {
    this.getNumFollows();
    var content = this.template({
      numFollows: this.numFollows,
      numFollowers: this.numFollowers,
      numReviews: this.model.reviews().length,
      userId: this.model.get('id'),
      userImage: this.model.get('image_url'),
      userImage: this.model.getLargerImage(),
      userName: this.model.get('name')
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderSuccess: function () {
    var $success = $('<div>').addClass('edit-success');
    $success.text('Successfully updated your profile');
    this.$('.user-content').prepend($success);

    setTimeout(function () {
      $success.css('opacity', 1);
    }, 100);

    setTimeout(function () {
      $success.css('opacity', 0);
      $success.one('transitionend', function () {
        $success.remove();
      });
    }, 3000);
  },

  swapView: function (selector) {
    if (typeof selector !== 'string') {
      selector = $(selector.currentTarget).attr('id');
    }
    this.changeSelectedTab(selector);
    if (this[selector + 'View']) {
      this.$('#user-main').html(this[selector + 'View'].render().$el);
    } else {
      this.createView(selector);
    }
  },

  updateSidebarReviews: function (num) {
    this.$('#num-reviews').html(num);
  }
});
