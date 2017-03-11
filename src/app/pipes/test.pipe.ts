import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe'
})
export class TestPipe implements PipeTransform {

  // value = argument passed in, args = arguments passed by appending testPipe with ':'. Example: testPipe:5 computes 10*5
  transform(value: number, args: any): number {
    let multiplier = parseFloat(args);
    if(!isNaN(value) && !isNaN(multiplier)) {
      return value*multiplier;
    }
    return;
  }

}
