import {Page, Modal, NavController} from 'ionic-angular';
import {Saved} from '../saved/saved';
import {Routes} from '../routes/routes';
import {Nearby} from '../nearby/nearby';
import {Search} from '../search/search';
import {OnInit} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavController]];
  }
  constructor(nav) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.nav = nav;
    this.tab1Root = Saved;
    this.tab2Root = Routes;
    this.tab3Root = Nearby;
  }
  openSearch() {
    this.nav.push(Search);
  }
}
