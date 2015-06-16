YelpClone.Views.MapShow = Backbone.View.extend({
  initialize: function () {
    this.renderMap();
    this.setMarkers();
  },

  mapInit: function () {
    if (this.model) {
      var business = this.model;
      var zoom = 16;
    } else {
      var business = this.collection.first();
      var zoom = 12;
    }
    var mapOptions = {
      center: {
        lat: business.get('latitude'),
        lng: business.get('longitude')
      },
      zoom: zoom
    };

    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  },

  renderMap: function () {
    // google.maps.event.addDomListener(window, 'load', this.mapInit.bind(this));
    this.mapInit();
  },

  setMarkers: function () {
    if (this.model) {
      this.collection = new YelpClone.Collections.Businesses([this.model]);
    }

    this.collection.each(function (business) {
      new google.maps.Marker({
        position: { lat: business.get('latitude'),
                  lng: business.get('longitude') },
        map: this.map,
        title: business.get('name')
      });
    }.bind(this));
  }
});
