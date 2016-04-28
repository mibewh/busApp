import {Page, Modal, NavController, NavParams} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {StopService} from '../../services/stop';
import {Favorite} from '../../components/favorite';
import {Map} from '../map/map';
import {Alarm} from '../alarm/alarm';
import {Observable} from 'rxjs/Observable';

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
    this.routes = [];
  }
  ngOnInit() {
    this.refresh();
  }
  //Refresh a stop's departures, on init and on pull down
  refresh(refresher) {
    Observable.forkJoin(
      this.stopService.getDepartures(this.stop.stop_id),
      this.stopService.getStopRoutes(this.stop.stop_id)
    ).subscribe(data => {
      this.departures = data[0].departures;
      this.routes = _.uniqBy(data[1].routes, 'route_color'); //Only use routes with different colors
      if(refresher) refresher.complete();
    });
  }
  //Open the google map for this stop
  openMap() {
    this.nav.push(Map, {stop: this.stop});
  }
  showAlarmModal() {
    var alarmModal = Modal.create(Alarm, {stop: this.stop, departures: this.departures});
    this.nav.present(alarmModal);
  }
  bg(color) {
    return '#'+color;
  }

}
