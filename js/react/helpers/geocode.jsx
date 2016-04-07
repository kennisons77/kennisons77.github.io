// Dependencies
import _ from 'lodash';

// Helper
import Map from './maps.jsx';

export default {
  getCity,
  supported: !!navigator.geolocation,
  getGeocode,
  getLocation
};

function getLocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function getGeocode(ref, options) {
  return Map.then(function getMap(google) {
    var geocoder = new google.maps.Geocoder;
    var search = {[_.isObject(ref) ? 'location' : 'address']: ref};

    if (options) {
      _.assign(search, options);
    }

    return new Promise(function(resolve, reject) {
      geocoder.geocode(search, resolve);
    });
  });
}

function getCity() {
  return getLocation()
    .then(function getCoords({coords}) {
      var coords = {lat: coords.latitude, lng: coords.longitude};
      return getGeocode(coords)
        .then(function getLocality(result) {

          var city = _.find(result, function(item) {
            return _.indexOf(item.types, 'locality') !== -1;
          });

          return {
            city,
            coords
          };
        });
    });
}
