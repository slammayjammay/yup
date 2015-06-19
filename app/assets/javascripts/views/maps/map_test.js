YelpClone.Views.MapTest = Backbone.View.extend({
  attributes: {
    id: 'map'
  },

  initialize: function () {
    this._markers = [];
  },

  endBounce: function (index) {
    this._markers[index].setAnimation(null);
  },

  initBusinessMap: function () {
    var mapOptions = {
      center: {
        lat: this.model.get('latitude'),
        lng: this.model.get('longitude')
      },
      zoom: 16
    };

    this.map = new google.maps.Map(this.el, mapOptions);
    var marker = new google.maps.Marker({
      position: { lat: this.model.get('latitude'),
                lng: this.model.get('longitude') },
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: this.model.get('name')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      this.showInfoWindow(event, marker);
    }.bind(this));
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
  },

  initSearchMap: function () {
    var business = this.collection.first();
    if (!business) {
      this.initDefaultMap();
      return
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


  showInfoWindow: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this.map, marker);
  },

  showNewResults: function (businesses) {
    for (var i = 0; i < this._markers.length; i++) {
        this._markers[i].setMap(null);
    }

    businesses.forEach(function (business) {
      var marker = new google.maps.Marker({
        position: { lat: business.latitude,
                  lng: business.longitude },
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: business.name
      });
    }.bind(this));
  },

  startBounce: function (index) {
    this._markers[index].setAnimation(google.maps.Animation.BOUNCE);
  }
});
