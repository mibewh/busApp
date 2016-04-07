import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';
import {StopInfo} from '../stop-info/stop-info'

//View nearby bus stops
@Page({
  templateUrl: 'build/pages/nearby/nearby.html',
  providers: [StopService]
})
export class Nearby {
  static get parameters() {
    return [[NavController], [StopService]];
  }
  //Get navigation info and StopService
  constructor(nav, stopService) {
    this.nav = nav;
    this.stopService = stopService;
  }
  //Output the closest stops to the user
  ngOnInit() {
    this.stopService.getClosestStops().subscribe(data => {
      this.stops = data.stops;
    });
  }
  //Open up the stop details page
  openStop(stop) {
    this.nav.push(StopInfo, {stop: stop});
  }

}
