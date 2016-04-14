import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';
import {StopInfo} from '../stop-info/stop-info';
import {Favorite} from '../../components/favorite';

//View nearby bus stops
@Page({
  templateUrl: 'build/pages/nearby/nearby.html',
  providers: [StopService],
  directives: [Favorite]
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
    this.refresh();
  }
  onPageWillEnter() {
    this.refresh();
  }
  refresh(refresher) {
    this.stopService.getClosestStops().then(data => {
        this.stops = data.stops;
        if(refresher) refresher.complete();
    });
  }
  //Open stop details
  openStop(stop) {
    this.nav.push(StopInfo, {stop: stop});
  }
}
