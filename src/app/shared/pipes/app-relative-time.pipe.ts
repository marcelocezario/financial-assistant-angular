import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../language';

const timeConstants = Object.freeze({
  SECONDS_IN_MILLISECONDS: 1000,
  MINUTES_IN_MILLISECONDS: 60000,
  HOURS_IN_MILLISECONDS: 3600000,
  DAYS_IN_MILLISECONDS: 86400000,
  WEEKS_IN_MILLISECONDS: 604800000,
  MONTHS_IN_YEARS: 12
});

type TimeType = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS' | 'NOW' | 'TODAY' | 'YESTERDAY' | 'TOMORROW'
type TemporalPosition = 'PAST' | 'FUTURE'
type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

@Pipe({
  name: 'appRelativeTime',
  standalone: true
})
export class AppRelativeTimePipe implements PipeTransform {

  constructor(private _languageService: LanguageService) { }

  transform(value: Date | string | undefined): unknown {
    if (!value) {
      return ''
    }
    try {
      const date = new Date(value)
      const now = new Date()
      const temporalPosition = now.getTime() >= date.getTime() ? 'PAST' : 'FUTURE'
      const yesterday = new Date(now.getTime() - 86400000)
      const tomorrow = new Date(now.getTime() + 86400000)
      const diffInSeconds = this._getDiffDatesInSeconds(now, date)
      const diffInMinutes = this._getDiffDatesInMinutes(now, date)
      const diffInHours = this._getDiffDatesInHours(now, date)
      const diffInDays = this._getDiffDatesInDays(now, date)
      const diffInWeeks = this._getDiffDatesInWeeks(now, date)
      const diffInMonths = this._getDiffDatesInMonths(now, date)
      const diffInYears = this._getDiffDatesInYears(now, date)

      /**
       * TODO
       * - adicionar datas futuras, ex: amanhã, semana que vem, etc...;
       * - adicionar maior especificidade, ex: 'Há 1 semana e 2 dias', 'Há 1 mês e 10 dias'
       */

      if (yesterday.toDateString() === date.toDateString()) {
        return this._getTranslate('YESTERDAY')
      } else if (tomorrow.toDateString() === date.toDateString()) {
        return this._getTranslate('TOMORROW')
      } else if (diffInSeconds < 60) {
        return this._getTranslate('NOW')
      } else if (diffInMinutes < 60) {
        return this._getTranslate('MINUTES', diffInMinutes, temporalPosition)
      } else if (diffInHours < 24) {
        return this._getTranslate('HOURS', diffInHours, temporalPosition)
      } else if (now.toDateString() === date.toDateString()) {
        return this._getTranslate('TODAY')
      } else if (diffInDays < 7) {
        if (temporalPosition === 'PAST') {
          return `${this._getDaysOfTheWeek(date)}`
        }
        return this._getTranslate('DAYS', diffInDays, temporalPosition)
      } else if (diffInMonths < 12) {
        if (diffInMonths < 1) {
          return this._getTranslate('WEEKS', diffInWeeks, temporalPosition)
        }
        return this._getTranslate('MONTHS', diffInMonths, temporalPosition)
      } else {
        return this._getTranslate('YEARS', diffInYears, temporalPosition)
      }
    } catch (_) {
      return value;
    }
  }

  private _getTranslate(key: TimeType, count: number | undefined = undefined, temporalPosition: TemporalPosition | undefined = undefined): string {
    let translateKey = `generic.relativeTime.${key}`
    if (count) {
      translateKey = `${translateKey}.${count === 1 ? 'singular' : 'plural'}`
    }
    const translated = this._languageService.getTranslateInstant(translateKey, { count: count })
    if (temporalPosition) {
      return this._languageService.getTranslateInstant(`generic.relativeTime.${temporalPosition}`, { relativeTime: translated })
    }
    return translated
  }

  private _getTranslateDayOfWeek(dayOfWeek: DayOfWeek): string {
    const translateKey = `generic.relativeTime.DAY_OF_WEEK.${dayOfWeek}`
    return this._languageService.getTranslateInstant(translateKey)
  }

  private _getDiffDatesInSeconds(date1: Date, date2: Date): number {
    return Math.floor(Math.abs((date1.getTime() - date2.getTime()) / timeConstants.SECONDS_IN_MILLISECONDS))
  }

  private _getDiffDatesInMinutes(date1: Date, date2: Date): number {
    return Math.floor(Math.abs((date1.getTime() - date2.getTime()) / timeConstants.MINUTES_IN_MILLISECONDS))
  }

  private _getDiffDatesInHours(date1: Date, date2: Date): number {
    return Math.floor(Math.abs((date1.getTime() - date2.getTime()) / timeConstants.HOURS_IN_MILLISECONDS))
  }

  private _getDiffDatesInDays(date1: Date, date2: Date): number {
    return Math.floor(Math.abs((date1.getTime() - date2.getTime()) / timeConstants.DAYS_IN_MILLISECONDS))
  }

  private _getDiffDatesInWeeks(date1: Date, date2: Date): number {
    return Math.floor(Math.abs((date1.getTime() - date2.getTime()) / timeConstants.WEEKS_IN_MILLISECONDS))
  }

  private _getDiffDatesInMonths(date1: Date, date2: Date): number {
    return Math.floor(Math.abs(date1.getMonth() - date2.getMonth() + (this._getDiffDatesInYears(date1, date2) * timeConstants.MONTHS_IN_YEARS)))
  }

  private _getDiffDatesInYears(date1: Date, date2: Date): number {
    return Math.floor(Math.abs(date1.getFullYear() - date2.getFullYear()))
  }

  private _getDaysOfTheWeek(date: Date): string {
    switch (date.getDay()) {
      case 0: return this._getTranslateDayOfWeek(`sunday`)
      case 1: return this._getTranslateDayOfWeek(`monday`)
      case 2: return this._getTranslateDayOfWeek(`tuesday`)
      case 3: return this._getTranslateDayOfWeek(`wednesday`)
      case 4: return this._getTranslateDayOfWeek(`thursday`)
      case 5: return this._getTranslateDayOfWeek(`friday`)
      case 6: return this._getTranslateDayOfWeek(`saturday`)
      default: return date.toDateString()
    }
  }

}
