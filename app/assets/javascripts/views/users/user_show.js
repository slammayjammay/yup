Yup.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  events: {
    "click li.edit": "renderEdit",
    "click li.followers": "renderFollowings",
    "click li.reviews": "renderReviews",
    "submit form": "edit"
  },

  initialize: function () {
    // this._sidebar = new Yup.Views.UserSidebar({
    //   model: this.model
    // });
    // this.addSubview('.user-sidebar', this._sidebar);
    this.renderReviews();
    this.listenTo(this.model, "sync change", this.render);
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
    var view = new Yup.Views.UserEdit({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderFollowings: function () {
    var view = new Yup.Views.UserFollowers({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderReviews: function () {
    var view = new Yup.Views.UserReviews({
      model: this.model,
      collection: this.collection
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderSuccess: function () {
    this.$('.edit-success').removeClass('invisible');
    this.$('.edit-success').text('-Successfully updated your profile');
    setTimeout(function () {
      this.$('.edit-success').addClass('invisible');
    }.bind(this), 3000);
  },

  _swapMainContent: function (view) {
    this._mainView && this.removeSubview('.user-main', this._mainView);
    this._mainView = view;
    this.attachSubviews();
    this.$('.user-main').html(view.$el)
    view.render();
  }
});
