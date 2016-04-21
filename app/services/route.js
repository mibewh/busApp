import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
import * as _ from 'lodash';
// import {Geolocation} from 'ionic-native';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

var key = 'e7541330816545a5a425fe08243ef60a';
var base = 'https://developer.cumtd.com/api/v2.2/json/';


//Service to obtain information about routes
@Injectable()
export class RouteService {
    static get parameters() {
      return [[Http]];
    }
    constructor(http) {
      this.http = http;
    }

    // Get all route information
    getRoutes() {
      let params = new URLSearchParams();
      params.set('key', key);
      return this.http.get(base+'GetRoutes', {search: params})
          .map(res => res.json())
          .map(res => {
            res.routes.forEach((route) => {
              route.name = `${route.route_short_name} ${route.route_long_name}`;
            });
            return res;
          })
          .catch(this.doError);
    }
    //Get the list of route ids currently running
    getActiveRoutes() {
      let params = new URLSearchParams();
      params.set('key', key);
      return Observable.forkJoin( //Run in parallel
        this.getRoutes(),
        this.http.get(base+'GetVehicles', {search: params})
            .map(res => res.json())
            .map(res => {
              return new Set(_.map(res.vehicles, 'trip.route_id')); //Only return the route ID, in a set, which ensures uniqueness
            })
      ).map(res => {
        var allRoutes = res[0].routes;
        var activeRoutes = res[1];
        return _.filter(allRoutes, function(route) {
          return activeRoutes.has(route.route_id); //Get full route details for all active routes
        });
      });
    }
    //Get the stop locations for a route with vehicles currently running
    getActiveRouteStopLocs(routeID) {
      let params = new URLSearchParams();
      params.set('key', key);
      params.set('route_id', routeID);
      //Get the trip corresponding to a route
      return this.http.get(base+'GetTripsByRoute', {search: params})
          .map(res => res.json())
          .flatMap(res => {
            if(res.trips.length == 0) return null;
            params.set('trip_id', res.trips[0].trip_id);
            //Get the stops for a vehicle on that route
            return this.http.get(base+'GetStopTimesByTrip', {search: params})
                .map(res => res.json())
                .map(res => {
                  return _.map(res.stop_times, function(time) {
                    //Only return necessary information
                    return {lat: time.stop_point.stop_lat, lon: time.stop_point.stop_lon, stop_name: time.stop_point.stop_name};
                  });
                });
          });
    }

    //Log error message
    doError(error) {
        console.error(error);
    }
}
