YelpClone.Views.MapShow = Backbone.View.extend({
  initialize: function () {
    this.renderMap();
  },

  mapInit: function () {
    if (!this.model && (!this.collection || this.collection.length == 0)) {
      var mapOptions = {
        center: {
          lat: 37.7532501,
          lng: -122.4067001,
          zoom: 8
        }
      };

      this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var bounds = new google.maps.LatLngBounds();
      var lat = new google.maps.LatLng(37.7532501, -122.4067001);
      var lng = new google.maps.LatLng(37.794079, -122.423538);

      bounds.extend(lat);
      bounds.extend(lng);

      this.map.fitBounds(bounds);
      return
    }

    if (this.model) {
      var business = this.model;
    } else {
      var business = this.collection.first();
    }
    var mapOptions = {
      center: {
        lat: business.get('latitude'),
        lng: business.get('longitude')
      }
    };

    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    this.setMarkers();
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
