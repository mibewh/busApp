import {Page} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {RouteService} from '../../services/route';

//List all bus routes
@Page({
  templateUrl: 'build/pages/routes/routes.html',
  providers: [RouteService]
})
export class Routes {
  static get parameters() {
    return [[RouteService]];
  }
  constructor(routeService) {
    //Inject StopService
    this.routeService = routeService;
  }
  ngOnInit() {
    //Output all routes to the user
    this.routeService.getRoutes().subscribe((data) => {
      this.routes = data.routes;
    });
  }
}
