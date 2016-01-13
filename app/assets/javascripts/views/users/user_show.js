Yup.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  id: 'user-show',
  events: {
    "click li#edit": "renderEdit",
    "click li#followers": "renderFollowers",
    "click li#reviews": "renderReviews",
    "submit form": "edit"
  },

  initialize: function () {
    this.renderReviews();
    this.listenTo(this.model, "sync change", this.render);
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

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderEdit: function () {
    this.changeSelectedTab('edit');
    var view = new Yup.Views.UserEdit({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderFollowers: function () {
    this.changeSelectedTab('followers');
    var view = new Yup.Views.UserFollowers({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderReviews: function () {
    this.changeSelectedTab('reviews');
    var view = new Yup.Views.UserReviews({
      model: this.model,
      collection: this.collection
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
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

  _swapMainContent: function (view) {
    this._mainView && this.removeSubview('.user-main', this._mainView);
    this._mainView = view;
    this.attachSubviews();
    this.$('.user-main').html(view.$el)
    view.render();
  }
});
