Yup.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  id: 'user-show',
  events: {
    "click ul.tabs li": "swapView",
    "submit form": "edit"
  },

  initialize: function (options) {
    if (options.isYelpUser) {
      this.collection = new Yup.Collections.Reviews();
      this.getSampleReviews();
    }

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, 'sync', this.swapView.bind(this, 'reviews'));
    this.swapView('reviews');
  },

  getSampleFollowings: function () {
    followings = new Yup.Collections.Reviews();
    followings.fetch({
      url: 'api/reviews/sample',
      data: { limit: 10 }
    });
    return followings;
  },

  getSampleReviews: function () {
    // Set Timeout: allow rendering of the rest of the page
    setTimeout(function () {
      this.collection.fetch({
        url: 'api/reviews/sample',
        data: { limit: 10 },
        success: function (collection) {
          this.updateSidebarReviews(collection.length);
        }.bind(this)
      });
    }.bind(this), 0);
  },

  changeSelectedTab: function (selector) {
    this.$('li').removeClass('selected');
    this.$('#' + selector).addClass('selected');
  },

  createView: function (selector) {
    if (selector === 'reviews') {
      this.reviewsView = new Yup.Views.UserReviews({
        model: this.model,
        collection: this.collection
      });
    } else if (selector === 'followings') {
      this.followingsView = new Yup.Views.UserFollowers({
        model: this.model,
        collection: this.getSampleFollowings()
      });
      this.$('.user-main').html(this.followingsView.render().$el);
    } else if (selector === 'edit') {
      this.editView = new Yup.Views.UserEdit({ model: this.model });
      this.$('.user-main').html(this.editView.render().$el);
    }
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

  render: function () {
    var content = this.template({ user: this.model });
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
      this.$('.user-main').html(this[selector + 'View'].render().$el);
    } else {
      this.createView(selector);
    }
  },

  updateSidebarReviews: function (num) {
    this.$('#num-reviews').html(num);
  }
});
