// TODO: Remove info windows on click

Yup.Views.MapShow = Backbone.View.extend({
  className: 'map',

  initialize: function () {
    this._markers = [];
    this.bounds = new google.maps.LatLngBounds();
    this.listenTo(this.collection, 'add', this.createMapMarker);
    this.listenTo(this.collection, 'sync', this.addMarkerHover);
    this.listenTo(this.collection, 'remove', this.removeMapMarker);
  },

  addBusinessMarkers: function () {
    if (this.collection.length === 0) {
      this.centerMap();
      return;
    }

    this.collection.each(function (business) {
      var loc = business.get('location').hash.coordinate;
      if (!loc) return;

      this.createMapMarker(business);

      var bound = new google.maps.LatLng(loc.latitude, loc.longitude);
      this.bounds.extend(bound);
    }.bind(this));

    this.map.fitBounds(this.bounds);
  },

  addMarkerEvents: function (marker, index) {
    $('#' + index).hover(
      this.startBounce.bind(this, index),
      this.endBounce.bind(this, index)
    );

    google.maps.event.addListener(marker, 'click', function (event) {
      this.showInfoWindow(event, marker);
    }.bind(this));
  },

  addMarkerHover: function () {
    this._markers.forEach(function (marker, index) {
      $('#' + index).hover(
        this.startBounce.bind(this, index),
        this.endBounce.bind(this, index)
      );
    }.bind(this))
  },

  centerMap: function () {
    var center = new google.maps.LatLng(37.75593775475197, -122.4258449736328);
    this.map.setCenter(center);
    this.map.setZoom(11);
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

    // extend map to show these new markers
    var bound = new google.maps.LatLng(
      business.get('location').hash.coordinate.latitude,
      business.get('location').hash.coordinate.longitude
    );
    this.bounds.extend(bound);
    this.map.fitBounds(this.bounds);
  },

  endBounce: function (index) {
    this._markers[index].setAnimation(null);
  },

  init: function (mapOptions) {
    if (!mapOptions) mapOptions = {};

    this.map = new google.maps.Map(this.el, mapOptions);

    setTimeout(function () {
      google.maps.event.trigger(this.map, 'resize');
      this.addBusinessMarkers();
    }.bind(this), 0);
  },

  removeMapMarker: function (model) {
    var removedMarkers = [];
    this._markers.forEach(function (marker, index) {
      if (model.get('name') === marker.title) {
        marker.setMap(null);
        removedMarkers.push(marker);
      }
    });

    removedMarkers.forEach(function (marker) {
      this._markers.splice(this._markers.indexOf(marker), 1);
    }.bind(this));

    // TODO: fix
    this.bounds = new google.maps.LatLngBounds();
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
