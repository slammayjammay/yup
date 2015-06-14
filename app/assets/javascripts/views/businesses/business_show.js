YelpClone.Views.BusinessShow = Backbone.CompositeView.extend({
  className: "business-show",
  template: JST['businesses/show'],
  events: {
    "click .add-review": "renderForm",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderReviews);
    this.listenTo(this.model, "sync", this.renderMap);
    this.listenTo(this.model.reviews(), "add", this.addReview);
  },

  addReview: function (review) {
    var view = new YelpClone.Views.ReviewIndexItem({ model: review });
    this.unshiftSubview('.business-reviews', view);
  },

  displayRating: function () {
    var rating = this.model.get('rating');
    rating = (Math.round(rating * 2) / 2).toFixed(1);
    this.$("#input-id").rating({ disabled: true });
    this.$("#input-id").rating('update', rating);
  },

  mapInit: function () {
    var business = this.model;
    var mapOptions = {
      center: {
        lat: business.get('latitude'),
        lng: business.get('longitude')
      },
      zoom: 16
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
      position: { lat: business.get('latitude'),
                lng: business.get('longitude') },
      map: map,
      title: business.get('name')
    });
  },

  render: function () {
    var content = this.template({ business: this.model });
    this.$el.html(content);
    this.displayRating();
    return this;
  },

  renderForm: function () {
    var view = new YelpClone.Views.ReviewForm({
      model: this.model
    });
    $('body').prepend(view.render().$el);
  },

  renderMap: function () {
    google.maps.event.addDomListener(window, 'load', this.mapInit.bind(this));
  },

  renderReviews: function () {
    var that = this;
    this.model.reviews().each(function (review, index) {
      var view = new YelpClone.Views.ReviewIndexItem({
        model: review,
        index: index
      });
      that.unshiftSubview('.business-reviews', view);
    });
  },
});
