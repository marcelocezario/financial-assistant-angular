import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCurrency',
  standalone: true
})
export class AppCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL', locale: string = 'pt-BR'): string | null {
    if (value == null) {
      return null;
    }

    const decimalPart = value.toString().split('.')[1];
    const decimalLength = decimalPart ? decimalPart.length : 0;

    const minimumFractionDigits = 2;
    const maximumFractionDigits = decimalLength > 2 ? decimalLength : 2;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits,
    }).format(value);
  }

}
