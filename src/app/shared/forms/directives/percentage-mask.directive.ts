import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPercentageMask]',
  standalone: true
})
export class PercentageMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    let value = input.value;

    value = value.replace(/[^0-9.]/g, '');

    const pointIndex = value.indexOf('.');
    if (pointIndex !== -1) {
      value = value.slice(0, pointIndex + 3);
    }

    if (value !== '') {
      value = parseFloat(value).toFixed(2) + '%';
    }

    input.value = value;
  }

}
