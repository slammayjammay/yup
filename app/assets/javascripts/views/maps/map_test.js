YelpClone.Views.MapShow = Backbone.View.extend({
  initialize: function () {
    this._markers = [];
    if (this.model) {
      this.businessMap();
    } else if (this.collection && this.collection.length > 0){
      this.searchMap();
    } else {
      this.defaultMap();
    }
  },

  endBounce: function (index) {
    this._markers[index].setAnimation(null);
  },

  businessMap: function () {
    var mapOptions = {
      center: {
        lat: this.model.get('latitude'),
        lng: this.model.get('longitude'),
        zoom: 16
      }
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: { lat: this.model.get('latitude'),
                lng: this.model.get('longitude') },
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: business.get('name')
    });

    this._markers.push(marker);
    google.maps.event.addListener(marker, 'click', function (event) {
      that.showInfoWindow(event, marker);
    });
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

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.setMarkers();
  },

  setMarkers: function () {
    var bounds = new google.maps.LatLngBounds();

    if (this.model) {
      this.collection = new YelpClone.Collections.Businesses([this.model]);
    }
    var that = this;

    this.collection.each(function (business, index) {
      var marker = new google.maps.Marker({
        position: { lat: business.get('latitude'),
                  lng: business.get('longitude') },
        map: that.map,
        animation: google.maps.Animation.DROP,
        title: business.get('name')
      });

      this._markers.push(marker);
      google.maps.event.addListener(marker, 'click', function (event) {
        that.showInfoWindow(event, marker);
      });

      var bound = new google.maps.LatLng(business.get('latitude'), business.get('longitude'));
      bounds.extend(bound);
    }.bind(this));

    this.map.fitBounds(bounds);
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
