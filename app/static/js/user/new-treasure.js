/* global google:true */
(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTres);
  });

  function addTres(e){
    var lat = $('#lat').val();
    if(!lat){
//Making this var Loca takes in the location and uses that addres to output the marker on the map

      var Loca = $('#location').val();
      geocode(Loca);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({address:address}, function(results, status){
      var name = results[0].formatted_address,
           lat = results[0].geometry.location.lat(),
           lng = results[0].geometry.location.lng();

      $('#location').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
      var data = $('form').serialize();
      console.log(data);
      console.log(lat, lng, name);
    });
  }
})();

