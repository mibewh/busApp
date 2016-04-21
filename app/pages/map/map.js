import {Page, NavController, NavParams} from 'ionic-angular';
import {MapService} from '../../services/mapService';
import {RouteService} from '../../services/route';
import {OnInit} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/map/map.html',
  providers: [MapService, RouteService]
})
export class Map {
  static get parameters() {
    return [[NavController], [NavParams], [MapService], [RouteService]];
  }

  constructor(nav, params, mapService, routeService) {
    this.nav = nav;
    this.stop = params.data.stop;
    this.route = params.data.route;
    this.mapService = mapService;
    this.routeService = routeService;
  }
  ngOnInit() {
    if(typeof this.stop != 'undefined') {
      //Get the stop location and then render the map
      this.title = this.stop.stop_name;
      var lat = this.stop.stop_points[0].stop_lat;
      var lon = this.stop.stop_points[0].stop_lon;
      this.mapService.loadMapWithStop(document.getElementById('map-container'), lat, lon, this.stop.stop_name);
    }
    else {
      //Get the route and then render the map
      this.title = this.route.name;
      this.routeService.getActiveRouteStopLocs(this.route.route_id).subscribe(route => {
        console.log(route);
        this.mapService.loadMapWithRoute(document.getElementById('map-container'), route);
      });
    }
  }
}
