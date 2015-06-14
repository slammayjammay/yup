YelpClone.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  events: {
    "click li.edit": "renderEdit",
    "click li.followers": "renderFollowers",
    "click li.reviews": "renderReviews",
    "submit form": "edit"
  },

  initialize: function () {
    this._sidebar = new YelpClone.Views.UserSidebar({
      model: this.model
    });
    this.addSubview('.user-sidebar', this._sidebar);
    this.renderFollowers();
    this.listenTo(this.model, "sync change", this.render);
  },

  edit: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();

    var that = this;
    this.model.save(data, {
      success: function () {
        that.renderFollowers();
      }
    });
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderEdit: function () {
    var view = new YelpClone.Views.UserEdit({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderFollowers: function () {
    var view = new YelpClone.Views.UserFollowers({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  renderReviews: function () {
    var view = new YelpClone.Views.UserReviews({
      model: this.model
    });
    this.addSubview('.user-main', view, true);
    this._swapMainContent(view);
  },

  _swapMainContent: function (view) {
    this._mainView && this.removeSubview('.user-main', this._mainView);
    this._mainView = view;
    this.attachSubviews();
    this.$('.user-main').html(view.$el)
    view.render();
  }
});
