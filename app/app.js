import 'es6-shim';
import {App, Platform, Storage, SqlStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    var storage = new Storage(SqlStorage, {existingDatabase: true});
    storage.get('route_changeset').then(null).catch(function(err) {
      //Create blank changeset
      storage.set('route_changeset', '');
    });
    storage.get('favorites').then(function(data) {
      if(!data) {
        console.log('Setting up favorites');
        storage.set('favorites', JSON.stringify({}));
      }
    });

    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
