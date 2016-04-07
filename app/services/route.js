import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
// import {Geolocation} from 'ionic-native';
import 'rxjs/Rx';

var key = 'e7541330816545a5a425fe08243ef60a';
var base = 'https://developer.cumtd.com/api/v2.2/json/';

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

    //Log error message
    doError(error) {
        console.error(error);
    }
}
