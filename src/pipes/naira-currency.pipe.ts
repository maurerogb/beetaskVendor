import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nairaCurrency'
})
export class NairaCurrencyPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    if (value == null) {
      return '₦0';
    }

    let amount = Number(value);
    if (isNaN(amount)) {
      return '₦0';
    }

    // Convert to Nigerian Naira format
    return '₦' + amount.toLocaleString('en-NG');
  }

}
