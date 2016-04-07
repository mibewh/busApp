import {Page} from 'ionic-angular';
import {Saved} from '../saved/saved';
import {Routes} from '../routes/routes';
import {Nearby} from '../nearby/nearby';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Saved;
    this.tab2Root = Routes;
    this.tab3Root = Nearby;
  }
}
