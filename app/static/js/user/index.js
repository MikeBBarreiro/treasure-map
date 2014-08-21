/* global google:true */

/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(30, 0, 2);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });

  function initMap(lat, lng, zoom){
    var styles   = [{'featureType':'administrative','stylers':[{'visibility':'off'}]},{'featureType':'poi','stylers':[{'visibility':'simplified'}]},{'featureType':'road','stylers':[{'visibility':'simplified'}]},{'featureType':'water','stylers':[{'visibility':'simplified'}]},{'featureType':'transit','stylers':[{'visibility':'simplified'}]},{'featureType':'landscape','stylers':[{'visibility':'simplified'}]},{'featureType':'road.highway','stylers':[{'visibility':'off'}]},{'featureType':'road.local','stylers':[{'visibility':'on'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'visibility':'on'}]},{'featureType':'water','stylers':[{'color':'#84afa3'},{'lightness':52}]},{'stylers':[{'saturation':-77}]},{'featureType':'road'}],
      mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name  = $(tr).attr('data-name'),
            lat = $(tr).attr('data-lat'),
            lng = $(tr).attr('data-lng'),
            pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};

      return pos;
    });
    return positions;
  }

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: '/img/xMarks.png'});
  }

})();

