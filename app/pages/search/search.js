import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {Focus} from '../../directives/focus';
import {Filter} from '../../pipes/filter';
import {StopService} from '../../services/stop';
import {StopInfo} from '../stop-info/stop-info';
import * as _ from 'lodash';

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/search/search.html',
  directives: [Focus],
  pipes: [Filter],
  providers: [StopService]
})
export class Search {
  static get parameters() {
    return [[NavController],[StopService]];
  }
  constructor(nav, stopService) {
    this.nav = nav;
    this.stopService = stopService;
    this.stops = [];
    this.query = "";
  }
  ngOnInit() {
    this.stopService.getStops().subscribe(data => {
      this.stops = data.stops;
    });
  }

  //Go back to main view, hiding search
  hideSearch() {
    this.nav.pop();
  }

  //Open stop details, and remove search from page stack
  openStop(stop) {
    this.nav.pop({animate: false}).then(() => { //Remove search page from stack
      this.nav.push(StopInfo, {stop: stop}); //Add selected to stack
    });
  }

}
