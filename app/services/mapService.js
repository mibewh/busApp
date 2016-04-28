import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
import * as _ from 'lodash';
import {Geolocation} from 'ionic-native';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MapService {
    static get parameters() {
      return [[Http]];
    }
    constructor(http) {
      this.http = http;
    }

    //Puts a map in a given element, with a marker at a stop's latitude/longitude
    loadMapWithStop(elem, lat, lon, stop_name) {
      //Create the map
      var loc = new google.maps.LatLng(lat,lon);
      var opts = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16,
        center: loc,
      };
      var map = new google.maps.Map(elem, opts);
      //Add a marker corresponding to the stop
      var stop = new google.maps.Marker({
        position: loc,
        map: map,
        title: stop_name
      });
      return map;
    }
    //Load a map into given element, with markers at each stop, centered around the middle stop
    loadMapWithRoute(elem, route) {
      var centerStop = route[Math.floor(route.length/2)]; //Get the center element
      var centerLoc = new google.maps.LatLng(centerStop.lat, centerStop.lon);
      var opts = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 14,
        center: centerLoc,
      };
      var map = new google.maps.Map(elem, opts);
      _.forEach(route, stop => {
        //Add a marker for each stop in the route
        var loc = new google.maps.LatLng(stop.lat, stop.lon);
        new google.maps.Marker({
          map: map,
          position: loc,
          title: stop.stop_name
        });
      });
      return map;
    }
}
