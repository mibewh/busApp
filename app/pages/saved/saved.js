import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';
import {StopInfo} from '../stop-info/stop-info';
import * as _ from 'lodash';

//View saved bus stop info
@Page({
  templateUrl: 'build/pages/saved/saved.html',
  providers: [StopService]
})
export class Saved {
  static get parameters() {
    return [[NavController], [StopService]];
  }
  //Get the nav info and StopService
  constructor(nav, stopService) {
    this.stopService = stopService;
    this.nav = nav;
  }
  // Temporarily, print all stops
  ngOnInit() {
    this.stops = [];
    this.refresh();
  }
  //Refresh of page enter, if need be
  onPageWillEnter() {
    this.stopService.getFavorites().then(favs => {
      var stops = _.values(favs);
      if(!_.isEqual(_.map(this.stops,'stop_id'),_.map(stops,'stop_id'))) {
        //Only refresh if something changed
        this.refresh();
      }
    });
  }
  //Refresh the view of saved stops, in case one has been added/removed
  refresh(refresher) {
    var stopService = this.stopService;
    this.stopService.getFavorites().then(favs => {
      this.stops = _.values(favs);
      this.stops.forEach(function(stop) {
        stopService.getStopRoutes(stop.stop_id).subscribe(data=>{
          stop.routes = _.uniqBy(data.routes, 'route_color');
        });
      });
      if(refresher) refresher.complete();
    });
  }
  //Open up the stop details page
  openStop(stop) {
    this.nav.push(StopInfo, {stop: stop});
  }
  //Output background string
  bg(color) {
    return '#'+color;
  }

}
