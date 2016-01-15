Yup.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  id: 'user-show',
  events: {
    "click ul.tabs li": "swapView",
    "submit form": "edit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenToOnce(this.model, "sync", this.prepareSubviews);
  },

  addSidebar: function () {
    var view = new Yup.Views.SidebarLeft({
      model: this.model
    });
    this.$el.prepend(view.render().$el);
  },

  changeSelectedTab: function (selector) {
    this.$('li').removeClass('selected');
    this.$('#' + selector).addClass('selected');
  },

  edit: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();

    this.model.save(data, {
      success: function () {
        this.renderReviews();
        setTimeout(function () {
          this.renderSuccess();
        }.bind(this), 0);
      }.bind(this)
    });
  },

  prepareSubviews: function () {
    this.editView = new Yup.Views.UserEdit({ model: this.model });
    this.followersView = new Yup.Views.UserFollowers({ model: this.model });
    this.reviewsView = new Yup.Views.UserReviews({
      model: this.model,
      collection: this.collection
    });

    this.changeSelectedTab('reviews');
    this.$('.user-main').html(this.reviewsView.render().$el);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
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

  swapView: function (event) {
    var selector = $(event.currentTarget).attr('id');
    this.changeSelectedTab(selector);
    this.$('.user-main').html(this[selector + 'View'].render().$el);
  }
});
