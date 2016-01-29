Yup.Views.SearchShow = Backbone.CompositeView.extend({
  className: 'search-show',
  template: JST['search/search_show'],

  events: {
    "click .filter": "filter"
  },

  initialize: function (options) {
    this.query = options.query;
    this.isLoadingContent = true;

    this.listenToOnce(this.collection, "sync", function () {
      this.isLoadingContent = false;
      $('.loading').remove();
      this.foundResults = this.collection.length !== 0;
      this.render();
      this.addSidebar();
    });
    this.listenTo(this.collection, "add", this.addBusiness.bind(this));
  },

  addBusiness: function (business) {
    var view = new Yup.Views.BusinessIndexItem({
      model: business,
      index: this.collection.indexOf(business)
    });

    this.addSubview('.businesses', view);
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
      order: this.order,
      foundResults: this.foundResults,
      query: this.query
    });
    this.$el.html(content);
    this.attachSubviews();

    if (this.isLoadingContent) {
      var loading = new Yup.Views.Loading('Fetching results...');
      loading.$el.addClass('query');
      this.$('.results').prepend(loading.$el);
    }

    return this;
  }
});
