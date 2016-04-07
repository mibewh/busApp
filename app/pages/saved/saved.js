import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';
import {StopInfo} from '../stop-info/stop-info'

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
    this.stopService.getStops().subscribe(data => {
      this.stops = data.stops;
    });
  }
  //Open up the stop details page
  openStop(stop) {
    this.nav.push(StopInfo, {stop: stop});
  }

}
