Yup.Views.BestOf = Backbone.CompositeView.extend({
  template: JST['best_of/best_of'],
  id: 'best-of',
  events: {
    'click .category': 'searchCategory'
  },

  initialize: function () {
    setTimeout(this.addSidebar.bind(this), 0);
    this.categories = [
      ['food'], ['nightlife'], ['restaurants'], ['shopping'],
      ['arts'], ['automotive', 'auto'], ['beauty & spas', 'beautysvc'], ['education'],
      ['event services', 'eventservices'], ['home services', 'homeservices'],
      ['local services', 'localservices'], ['active life', 'active'],
      ['health & medicine', 'health']
    ];

    this.listenTo(this.collection, 'sync', this.showBusinesses);
    this.listenTo(this.collection, 'remove', function (model) {
      this.removeModelSubview('#best-of-businesses', model);
    });
    setTimeout(function () {
      $('.category').eq(1).addClass('selected');
    }, 0);
  },

  addSidebar: function () {
    var sidebar = new Yup.Views.SidebarRight({ collection: this.collection });
    this.$el.append(sidebar.render().$el);
  },

  render: function () {
    var content = this.template({
      categories: this.categories
    });
    this.$el.html(content)
    this.attachSubviews();
    return this;
  },

  searchCategory: function (event) {
    var $div = $(event.currentTarget);
    if ($div.attr('id') === 'outline') {
      return;
    }

    $('.category.selected').removeClass('selected');
    $div.addClass('selected');

    var newHeight = $div.outerHeight() * ($div.index() - 1);
    if ($div.is(':last-child')) newHeight += 1;
    if ($div.is(':nth-child(2)')) newHeight -= 1;
    $('#outline').css('top', newHeight + 'px');

    var title = $div.text().trim().split(' ');
    title.forEach(function (word, index) {
      title[index] = word[0].toUpperCase() + word.slice(1);
    });
    this.$('.category-title').text(title.join(' '));

    this.collection.fetch({
      data: { category: $div.attr('filter') }
    });
  },

  showBusinesses: function () {
    this.collection.each(function (business, index) {
      var view = new Yup.Views.BusinessIndexItem({
        model: business,
        index: index,
        mini: true
      });
      this.addSubview('#best-of-businesses', view);
    }.bind(this));
  }
});
