import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
import {Geolocation} from 'ionic-native';
import 'rxjs/Rx';

var key = 'e7541330816545a5a425fe08243ef60a';
var base = 'https://developer.cumtd.com/api/v2.2/json/';

//Service to give information about stops
@Injectable()
export class StopService {
    static get parameters() {
      return [[Http]];
    }
    //get Http for use
    constructor(http) {
        this.http = http;
    }
    //Obtain all CUMTD Stops
    getStops() {
        let params = new URLSearchParams();
        params.set('key', key);
        // return this.http.get(base+`GetStops?key=${key}`)
        return this.http.get(base+`GetStops`, {search: params})
            .map(res => res.json())
            .catch(this.doError);
    }

    //Obtain stops closest to caller by latitude, longitude
    getClosestStops() {
      let params = new URLSearchParams();
      params.set('key', key);
      return Geolocation.watchPosition() //Get the current position
            .flatMap((pos) => {
              params.set('lat', pos.coords.latitude);
              params.set('lon', pos.coords.longitude);
              //Perform the API call to get closest stops
              return this.http.get(base+'GetStopsByLatLon', {search: params})
                  .map(res => res.json())
                  .catch(this.doError)
            });

    }
    //Get the departure times for a stop
    getDepartures(stopID) {
      let params = new URLSearchParams();
      params.set('key', key);
      params.set('stop_id', stopID);
      return this.http.get(base+'GetDeparturesByStop', {search: params})
          .map(res => res.json())
          .catch(this.doError)
    }
    //Log error message
    doError(error) {
        console.error(error);
    }

}
