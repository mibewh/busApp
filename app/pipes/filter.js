import {Pipe} from 'angular2/core';

@Pipe({
  name: 'filter'
})
export class Filter {
  transform(stops, [query]) {
    //Filter out the list of stops based on stop names and the query string
    return stops.filter((stop) => stop.stop_name.toLowerCase().includes(query.toLowerCase()));
  }
}
