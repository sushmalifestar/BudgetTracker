import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(amount: number): string {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
    }
  
    if (amount >= 100000) {
      return (amount / 100000).toFixed(2).replace(/\.00$/, '') + ' L';
    }
  
    return amount.toLocaleString('en-IN');
  }

}
