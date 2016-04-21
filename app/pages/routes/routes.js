import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {RouteService} from '../../services/route';
import {Map} from '../map/map';

//List all bus routes
@Page({
  templateUrl: 'build/pages/routes/routes.html',
  providers: [RouteService]
})
export class Routes {
  static get parameters() {
    return [[RouteService], [NavController]];
  }
  constructor(routeService, navController) {
    this.routeService = routeService;
    this.nav = navController;
  }
  ngOnInit() {
    //Output all routes to the user
    this.refresh();
  }
  //Refresh active rotues
  refresh(refresher) {
    this.routeService.getActiveRoutes().subscribe((routes) => {
      this.routes = routes;
    });
    if(refresher) refresher.complete();
  }
  //Open up the route map view
  openMap(route) {
    this.nav.push(Map, {route: route});
  }
  //Output background string
  bg(color) {
    return '#'+color;
  }
}
