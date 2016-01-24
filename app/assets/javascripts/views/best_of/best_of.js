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
      ['health & medicine', 'health'], ['hotels & travel', 'hotelstravel'],
      ['real estate', 'realestate'], ['pets']
    ];

    this.listenTo(this.collection, 'sync', this.showBusinesses);
    this.listenTo(this.collection, 'remove', this.removeBusiness);
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

  removeBusiness: function (business) {
    this.removeModelSubview('#best-of-businesses', business);
  },

  searchCategory: function (event) {
    var $selectedCat = $(event.currentTarget);
    if ($selectedCat.attr('id') === 'outline') {
      return;
    }

    var searchedCategory = $selectedCat.attr('filter');
    this.updateCategoriesStyle($selectedCat);
    this.updateCategoriesTitle($selectedCat);

    this.collection.fetch({
      data: {
        category: searchedCategory,
        limit: 6
      }
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
  },

  updateCategoriesStyle: function ($selectedCat) {
    $('.category.selected').removeClass('selected');
    $selectedCat.addClass('selected');

    var newHeight = $selectedCat.outerHeight() * ($selectedCat.index() - 1);
    if ($selectedCat.is(':nth-child(2)')) {
      newHeight -= 1;
      $('#outline').removeClass('hide-left-border');
    } else if ($selectedCat.is(':last-child')) {
      newHeight += 1;
      $('#outline').removeClass('hide-left-border');
    } else {
      $('#outline').addClass('hide-left-border');
    }
    $('#outline').css('top', newHeight + 'px');
  },

  updateCategoriesTitle: function ($selectedCat) {
    var title = $selectedCat.text().trim().split(' ');
    title.forEach(function (word, index) {
      title[index] = word[0].toUpperCase() + word.slice(1);
    });
    this.$('.category-title').text(title.join(' '));
  }
});
