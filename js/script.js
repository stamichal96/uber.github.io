var route = {
  from: null,
  to: null
};
var directionsService;
var directionsRenderer;

function randomCords(max, min) {
  return Math.random() * (max - min) + min;
}

function initialize() {
  var map = new google.maps.Map(document.getElementById("map_canvas"), {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}
google.maps.event.addDomListener(window, "load", initialize);

function initMap() {
  var lat = randomCords(50.087452, 50.036598);
  var lng = randomCords(20.009137, 19.8895323);
  var center = { lat, lng };
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#8080ff"
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#111"
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#e6e600"
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5"
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#99ff99"
          },
          {
            lightness: 21
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#ffffff"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36
          },
          {
            color: "#333333"
          },
          {
            lightness: 40
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#f2f2f2"
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#fefefe"
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#fefefe"
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      }
    ]
  });
  var marker = new google.maps.Marker({ position: center, map });

  directionsRenderer.setMap(map);
  route.from = center;

  initAutocomplete();

  document.getElementById("confirm").addEventListener("click", function() {
    buildRoute(directionsService, directionsRenderer, route);
  });
}

function buildRoute(address) {
  directionsService.route(
    {
      origin: route.from,
      destination: address,
      travelMode: "DRIVING"
    },
    function(response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete")
  );
  autocomplete.addListener("place_changed", setAddress);
}

function setAddress() {
  var place = autocomplete.getPlace();
  route.to = place.formatted_address;
}

function findRoute() {

}