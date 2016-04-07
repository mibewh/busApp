import {Page, NavController, NavParams} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';

//Show info about a stop, including upcoming bus arrivals
@Page({
  templateUrl: 'build/pages/stop-info/stop-info.html',
  providers: [StopService]
})
export class StopInfo {
  static get parameters() {
    return [[NavController], [NavParams], [StopService]];
  }

  constructor(nav, params, stopService) {
    this.nav = nav;
    this.stop = params.data.stop;
    this.stopService = stopService;
  }
  ngOnInit() {
    this.stopService.getDepartures(this.stop.stop_id).subscribe(data => {
      this.departures = data.departures;
    });
  }
}
