import {Page, NavController, NavParams} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';
import {Favorite} from '../../components/favorite';


//Show info about a stop, including upcoming bus arrivals
@Page({
  templateUrl: 'build/pages/stop-info/stop-info.html',
  providers: [StopService],
  directives: [Favorite]
})
export class StopInfo {
  static get parameters() {
    return [[NavController], [NavParams], [StopService]];
  }

  constructor(nav, params, stopService) {
    this.nav = nav;
    this.stop = params.data.stop;
    this.stopService = stopService;
    this.departures = [];
  }
  ngOnInit() {
    this.refresh();
  }
  refresh(refresher) {
    this.stopService.getDepartures(this.stop.stop_id).subscribe(data => {
      this.departures = data.departures;
      if(refresher) refresher.complete();
    });
  }
  bg(color) {
    return '#'+color;
  }
}
