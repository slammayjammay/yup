YelpClone.Views.MapShow = Backbone.View.extend({
  initialize: function () {
    this.renderMap();
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

  renderMap: function () {
    // google.maps.event.addDomListener(window, 'load', this.mapInit.bind(this));
    this.mapInit();
  }
});
