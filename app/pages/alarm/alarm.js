import {Page, ViewController, NavParams} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {LocalNotifications, Toast} from 'ionic-native';
import * as _ from 'lodash';

/*
  Generated class for the AlarmPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/alarm/alarm.html',
})
export class Alarm {
  static get parameters() {
    return [[ViewController], [NavParams]];
  }

  constructor(view, params) {
    this.view = view;
    this.departures = params.get('departures');
    this.stop = params.get('stop');
    this.selection = "0";
    this.walk = "0";
    this._ = _;
  }
  close() {
    this.view.dismiss();
  }
  submit() {
    //Calculate the time to send the notification
    var dep = this.departures[parseInt(this.selection)];
    var time_mins =  dep.expected_mins - parseInt(this.walk);
    if(time_mins < 0) { // Impossible to make the bus
      Toast.show(`You can't make that bus!`, 3000, "bottom").subscribe(
        toast => {
          console.log(toast);
        },
        error => {
          console.log('Error', error);
        }
      );
      return;
    }
    var time = 1000 * 60 * time_mins; // Time is in milliseconds
    //Schedule the notification
    LocalNotifications.schedule({
      id: 1,
      text: `Leave for your ${dep.headsign} at ${this.stop.stop_name}`,
      at: new Date(new Date().getTime() + time), //Set the delay
      sound: 'file://beep.caf',
      led: '00FF00'
    });
    //Display a message saying that the alarm was created
    Toast.show(`Alarm set for ${time_mins} minutes`, 3000, "bottom").subscribe(
      toast => {
        console.log(toast);
      },
      error => {
        console.log('Error', error);
      }
    );
    //Dismiss the alarm creator
    this.view.dismiss();
  }

}
