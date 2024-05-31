import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appRelativeTime',
  standalone: true
})
export class AppRelativeTimePipe implements PipeTransform {

  transform(value: Date | string): unknown {
    if (!value) {
      return value;
    }
    try {
      const now = new Date();
      const date = new Date(value);
      const diffInMs = now.getTime() - date.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      /**
       * TODO
       * - adicionar suporte multi idiomas;
       * - adicionar datas futuras, ex: amanhã, semana que vem, etc...;
       * - adicionar maior especificidade, ex: 'Há 1 semana e 2 dias', 'Há 1 mês e 10 dias'
       */

      if (diffInSeconds < 60) {
        return 'agora';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutos atrás`;
      } else if (diffInHours < 24) {
        return `${diffInHours} horas atrás`;
      } else if (diffInDays < 7) {
        return `${diffInDays} dias atrás`;
      } else if (diffInWeeks < 4) {
        return `${diffInWeeks} semanas atrás`;
      } else if (diffInMonths < 12) {
        return `${diffInMonths} meses atrás`;
      } else {
        return `${diffInYears} anos atrás`;
      }
    } catch (_) {
      return value;
    }
  }

}
