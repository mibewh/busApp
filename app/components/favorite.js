import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Component, Input} from 'angular2/core';
import {OnInit, OnChanges} from 'angular2/core';
import {StopService} from '../services/stop';
import * as _ from 'lodash';

//Represents a toggleable favorite star
@Component({
  selector: 'favorite',
  template: '<ion-icon [name]="getIcon()" (click)="toggleFavorite($event)"></ion-icon>',
  inputs: ['stop'],
  directives: [IONIC_DIRECTIVES],
  providers: [StopService]
})
export class Favorite {
  static get parameters() {
    return [[StopService]];
  }
  constructor(stopService) {
    this.stopService = stopService;
  }
  ngOnInit() {
    this.favs = {};
    this.stopID = this.stop.stop_id;
    if(!this.icon) this.icon = "star-outline";
  }
  //Toggle the state of the stop, to favorite/not favorite
  toggleFavorite(event) {
    event.stopPropagation();
    this.stopService.getFavorites().then(favs=>{
      if(!favs[this.stopID]) {
        favs[this.stopID] = this.stop;
        this.icon = "star";
      } else {
        favs[this.stopID] = undefined;
        this.icon = "star-outline";
      }
      this.stopService.setFavorites(favs);
    });
  }
  //Update the star on changes to make sure it is accurate
  ngOnChanges() {
    this.updateIcon();
  }
  //Determine star state
  updateIcon() {
    this.stopService.getFavorites().then(favs=>{
      if(!favs[this.stopID]) {
        this.icon = "star-outline";
      } else {
        this.icon = "star";
      }
    });
  }
  getIcon() {
    return this.icon;
  }
}
