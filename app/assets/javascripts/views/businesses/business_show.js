Yup.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm"
  },

  initialize: function () {
    this.collection.fetch({
      url: 'api/reviews/sample',
      remove: false,
      data: { limit: ~~(Math.random() * 10) }
    });

    this.listenTo(this.collection, 'add', this.addReview);
    this.listenTo(this.collection, 'sync', this.displayRating);
    this.listenTo(this.model, 'sync', this.render);
    this.listenToOnce(this.model, 'sync', this.renderMap);
  },

  addReview: function (review) {
    review.set('business_id', this.model.get('id'));
    var view = new Yup.Views.ReviewIndexItem({
      model: review
    });
    this.addSubview('.business-reviews', view, !review.isYelpReview);

    // Update review count
    if (!review.isYelpReview) {
      var numReviews = parseInt(this.$('#num-reviews').text());
      this.$('#num-reviews').text(numReviews + 1);
    }
  },

  addImages: function () {
    if (!this.model.get('sample_images')) return;

    var $img = $('<img>').attr('src', this.model.get('sample_images')[0])
    $('.images').append($img);

    var $img = $('<img>').attr('src', this.model.get('image_url'));
    $img.addClass('selected');
    $('.images').append($img);

    var $img = $('<img>').attr('src', this.model.get('sample_images')[1])
    $('.images').append($img);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    // update the rating based on any yup reviews made
    this.collection.each(function (review) {
      if (review.isYelpReview) return;
      var diff = review.get('rating') - rating;
      rating += diff / this.model.get('review_count');
    }.bind(this));

    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  getNumReviews: function () {
    var numReviews = this.model.get('review_count');
    this.collection.each(function (review) {
      if (!review.isYelpReview) {
        numReviews += 1;
      }
    });
    return numReviews;
  },

  render: function () {
    var content = this.template({
      address: this.model.address().join(', '),
      name: this.model.get('name'),
      numReviews: this.getNumReviews(),
    });

    this.$el.html(content);
    this.attachSubviews();
    this.addImages();
    this.displayRating();
    return this;
  },

  renderForm: function () {
    var $backdrop = $('<div class="backdrop begin">');
    $('body').prepend($backdrop);
    setTimeout(function () {
      $backdrop.removeClass('begin');
    }, 0);
    var view = new Yup.Views.ReviewForm({
      model: this.model,
      collection: this.collection
    });
    $('.backdrop').append(view.render().$el);
  },

  renderMap: function () {
    var mapView = new Yup.Views.MapShow({
      collection: new Yup.Collections.Businesses([this.model])
    });
    mapView.init({ maxZoom: 16 });
    this.$('#map').prepend(mapView.$el);
  }
});
