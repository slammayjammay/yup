YelpClone.Views.MapShow = Backbone.View.extend({
  initialize: function () {
    this.renderMap();
    this.setMarkers();
  },

  mapInit: function () {
    if (this.model) {
      var business = this.model;
    } else {
      var business = this.collection.first();
    }
    var mapOptions = {
      center: {
        lat: business.get('latitude'),
        lng: business.get('longitude')
      },
      zoom: 16
    };

    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  },

  renderMap: function () {
    // google.maps.event.addDomListener(window, 'load', this.mapInit.bind(this));
    this.mapInit();
  },

  setMarkers: function () {
    var bounds = new google.maps.LatLngBounds();

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

      var bound = new google.maps.LatLng(business.get('latitude'), business.get('longitude'));
      bounds.extend(bound);
    }.bind(this));

    this.map.fitBounds(bounds);
  }
});
