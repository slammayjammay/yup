Yup.Views.MapShow = Backbone.View.extend({
  attributes: {
    id: 'map'
  },

  initialize: function () {
    this._markers = [];
    this.listenTo(this.collection, 'add', this.createMapMarker);
  },

  addMarkerEvents: function (marker, index) {
    $('#' + index).hover(
      function () {
        this.startBounce(index);
      }.bind(this),
      function () {
        this.endBounce(index);
      }.bind(this)
    );

    google.maps.event.addListener(marker, 'click', function (event) {
      this.showInfoWindow(event, marker);
    }.bind(this));
  },

  addBusinessMarkers: function () {
    var bounds = new google.maps.LatLngBounds();

    this.collection.each(function (business) {
      if (!business.get('location').hash.coordinate) return;

      this.createMapMarker(business);

      var bound = new google.maps.LatLng(
        business.get('location').hash.coordinate.latitude,
        business.get('location').hash.coordinate.longitude
      );
      bounds.extend(bound);
    }.bind(this));

    this.map.fitBounds(bounds);
    this.map.setOptions({ maxZoom: 16 });
  },

  createMapMarker: function (business) {
    var marker = new google.maps.Marker({
      position: {
        lat: business.get('location').hash.coordinate.latitude,
        lng: business.get('location').hash.coordinate.longitude
      },
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: business.get('name')
    });
    this.addMarkerEvents(marker, this.collection.indexOf(business));
    this._markers.push(marker);
  },

  endBounce: function (index) {
    this._markers[index].setAnimation(null);
  },

  initDefaultMap: function () {
    var mapOptions = {
      center: {
        lat: 37.7532501,
        lng: -122.4067001,
      },
      zoom: 11
    };

    this.map = new google.maps.Map(this.el, mapOptions);
    setTimeout(function () {
      google.maps.event.trigger(this.map, 'resize');
      this.addBusinessMarkers();
    }.bind(this), 0);
  },

  initSearchMap: function () {
    var business = this.collection.first();
    if (!business) {
      this.initDefaultMap();
      return;
    }
    var mapOptions = {
      center: {
        lat: business.get('latitude'),
        lng: business.get('longitude')
      }
    };

    this.map = new google.maps.Map(this.el, mapOptions);
    var bounds = new google.maps.LatLngBounds();

    this.collection.each(function (business) {
      var marker = new google.maps.Marker({
        position: { lat: business.get('latitude'),
                  lng: business.get('longitude') },
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: business.get('name')
      });

      this._markers.push(marker);
      google.maps.event.addListener(marker, 'click', function (event) {
        this.showInfoWindow(event, marker);
      }.bind(this));

      var bound = new google.maps.LatLng(business.get('latitude'), business.get('longitude'));
      bounds.extend(bound);
    }.bind(this));

    this.map.fitBounds(bounds);
  },

  removeMarkers: function () {
    for (var i = 0; i < this._markers.length; i++) {
      this._markers[i].setMap(null);
    }
    this._markers = [];
  },


  showInfoWindow: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this.map, marker);
  },

  startBounce: function (index) {
    this._markers[index].setAnimation(google.maps.Animation.BOUNCE);
  }
});
