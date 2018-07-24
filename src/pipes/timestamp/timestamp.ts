import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorData',
})
export class ValorData implements PipeTransform {
  
  transform(timestamp: number) {

    var date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");

  }
}


@Pipe({
  name: 'valorHora',
})
export class ValorHora implements PipeTransform {
  
  transform(timestamp: number) {

    var date = new Date(timestamp);
    return date.toLocaleTimeString("pt-BR");

  }
}
