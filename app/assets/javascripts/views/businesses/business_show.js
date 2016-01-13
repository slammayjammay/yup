Yup.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.addReviews);
    this.listenTo(this.model, "sync", this.addImages);
    this.listenToOnce(this.model, "sync", this.renderMap);
  },

  addReviews: function (business) {
    business.yelpReviews().each(function (review) {
      var view = new Yup.Views.ReviewIndexItem({
        model: review,
        business: this.model
      });
      this.addSubview('.business-reviews', view);
    }.bind(this));
  },

  addImages: function () {
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
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  render: function () {
    var content = this.template({
      business: this.model,
      address: this.model.address().join(', '),
      reviews: this.collection
    });

    this.$el.html(content);
    this.attachSubviews();
    this.displayRating();
    return this;
  },

  renderForm: function () {
    $('body').prepend('<div class="backdrop">');
    var view = new Yup.Views.ReviewForm({
      model: this.model
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
