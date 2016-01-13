Yup.Views.SearchShow = Backbone.CompositeView.extend({
  className: 'search-show',
  template: JST['search/search_show'],

  events: {
    "click .category-index-item": "switchBusinesses",
    "click .filter": "filter"
  },

  initialize: function (options) {
    this.query = options.query;

    this.listenToOnce(this.collection, "sync", this.render);
    this.listenToOnce(this.collection, "sync", this.addSidebar);
    this.listenTo(this.collection, "add", this.addBusiness.bind(this));
  },

  addSidebar: function () {
    var sidebar = new Yup.Views.SidebarRight({
      collection: this.collection
    });
    this.$el.append(sidebar.render().$el);
  },

  fetchNextPage: function () {
    this.collection.fetch({
      remove: false,
      data: {
        searchKeys: this.query,
        page: this.collection.page + 1
      }
    });
  },

  filter: function (event) {
    this.order = $(event.currentTarget).find('input').attr('class');
    Backbone.history.navigate(
      "search/" + this.query + "/" + this.order,
      { trigger: true }
    );
  },

  render: function () {
    var content = this.template({
      businesses: this.collection,
      query: this.query,
      order: this.order
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBusiness: function (business) {
    var view = new Yup.Views.BusinessIndexItem({
      model: business,
      index: this.collection.indexOf(business)
    });

    this.addSubview('.businesses', view);
  },

  renderCategories: function () {
    var that = this;
    this.categories.forEach(function (category) {
      var view = new Yup.Views.CategoryIndexItem({
        category: category
      });
      that.addSubview('.categories', view);
    });
  },

  switchBusinesses: function (event) {
    var category = $(event.currentTarget).text().trim();
    Backbone.history.navigate("search/" + category, { trigger: true });
  }
});
