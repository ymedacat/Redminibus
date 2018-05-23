var initialLocation;
var hk = new google.maps.LatLng(22.38,114.10);
var browserSupportFlag =  new Boolean();

var directionsDisplay;
var oldDirections = [];
var currentDirections = null;

function initialize() {
  var myOptions = {
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  directionsDisplay = new google.maps.DirectionsRenderer({
    'map': map,
    'preserveViewport': true,
    'draggable': true
  }); 
  
  directionsDisplay.setPanel(document.getElementById("directions_panel"));

  google.maps.event.addListener(directionsDisplay, 'directions_changed',
    function() {
      if (currentDirections) {
        oldDirections.push(currentDirections);          
      }
      currentDirections = directionsDisplay.getDirections();
    });
  
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
      var marker = new google.maps.Marker({
      position: initialLocation,
      map: map
  });
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });

  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
  
  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("地圖定位失敗");
    } else {
      alert("您的瀏覽器不支援定位服務");
    }
	initialLocation = hk;
    map.setCenter(initialLocation);
  }
}

let calcRoute2 = function(pFrom,pEnd) {
    //alert(pFrom+"_"+pEnd);
  var start = pFrom;
  var end = pEnd;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
  alert(response+"_"+status);
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });

}