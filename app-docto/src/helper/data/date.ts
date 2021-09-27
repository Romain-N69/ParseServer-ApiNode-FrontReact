import {
  DateInput,
  IDateStr,
  IDateTimeStr,
  ITimeStr,
  ValidDateInput
} from '@custom-types/date';
import { capitalizeFirstLetter } from '@helper/string';
import moment, { Moment } from 'moment';

import { DATE_STR_FORMAT, TIME_STR_FORMAT, TIME_STR_MIDNIGHT } from './types';

export const DATE_STR_FRENCH_FORMAT = 'DD/MM/YYYY';
export const TIME_STR_FRENCH_FORMAT = 'HH[h]mm';

moment.locale('fr');

moment.updateLocale('fr', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1 s',
    ss: '%d s',
    m: '1 min',
    mm: '%d min ',
    h: '1 h',
    hh: '%d h',
    d: '1 j',
    dd: '%d j',
    M: '1 mois',
    MM: '%d mois',
    y: '1 an',
    yy: '%d ans'
  }
});

export function toMomentDate(date: ValidDateInput): Moment;
export function toMomentDate(
  date: DateInput,
  format?: moment.MomentFormatSpecification
): Moment | undefined;
export function toMomentDate(
  date: DateInput,
  format?: moment.MomentFormatSpecification
): Moment | undefined {
  // tslint:disable-next-line: strict-boolean-expressions
  if (date) {
    try {
      const mo = moment(date as any, format);
      if (mo.isValid()) return mo;
    } catch (error) {
      console.warn('[🐛] toMomentDate:', date);
    }
  }
  return undefined;
}

export function toDate(date: ValidDateInput): Date;
export function toDate(date: DateInput): Date | undefined;
export function toDate(date: DateInput): Date | undefined {
  const mo = toMomentDate(date);
  return mo ? mo.toDate() : undefined;
}

export function toDateStr(date: ValidDateInput): IDateStr;
export function toDateStr(date: DateInput): IDateStr | undefined;
export function toDateStr(date: DateInput): IDateStr | undefined {
  const mo = toMomentDate(date);
  return mo ? ((mo.format(DATE_STR_FORMAT) as any) as IDateStr) : undefined;
}

export function toDateTimeStr(
  date: ValidDateInput,
  utc?: boolean
): IDateTimeStr;
export function toDateTimeStr(
  date: DateInput,
  utc?: boolean
): IDateTimeStr | undefined;
export function toDateTimeStr(
  date: DateInput,
  utc: boolean = false
): IDateTimeStr | undefined {
  const mo = toMomentDate(date);
  if (utc) {
    return mo
      ? (mo
          .utc()
          .format(`${DATE_STR_FORMAT} ${TIME_STR_FORMAT}`) as IDateTimeStr)
      : undefined;
  }
  return mo
    ? (mo.format(`${DATE_STR_FORMAT} ${TIME_STR_FORMAT}`) as IDateTimeStr)
    : undefined;
}

export function timeStrToMomentDate(
  timeStr: ITimeStr,
  dateStr: IDateStr = toDateStr(new Date())
): Moment {
  const date = moment(
    `${dateStr}${timeStr}`,
    `${DATE_STR_FORMAT} ${TIME_STR_FORMAT}`
  );
  return date;
}

export function dateStrToMomentDate(
  dateStr: IDateStr,
  timeStr: ITimeStr = TIME_STR_MIDNIGHT
): Moment {
  // Convert UTC IDateStr / ITimeStr to local timezone
  const date = moment(
    `${dateStr} ${timeStr}`,
    `${DATE_STR_FORMAT}${TIME_STR_FORMAT}`
  );
  return date;
}

export function formatDateString(
  dateStr: ValidDateInput,
  format: string
): string;
export function formatDateString(
  dateStr: DateInput,
  format: string
): string | undefined;
export function formatDateString(
  dateStr: DateInput,
  format: string
): string | undefined {
  const m = toMomentDate(dateStr);
  if (!m) return undefined;
  return m.format(format);
}

export function addDaysToDate(dateStr: ValidDateInput, days: number): Moment;
export function addDaysToDate(
  dateStr: DateInput,
  days: number
): Moment | undefined;
export function addDaysToDate(
  dateStr: DateInput,
  days: number
): Moment | undefined {
  const m = toMomentDate(dateStr);
  if (!m) return undefined;
  return m.add(days, 'days');
}

export function daysBetweenDates(
  start: ValidDateInput,
  end: ValidDateInput
): number;
export function daysBetweenDates(
  start: DateInput,
  end: DateInput
): number | undefined;
export function daysBetweenDates(
  start: DateInput,
  end: DateInput
): number | undefined {
  const a = toMomentDate(start);
  const b = toMomentDate(end);
  if (a && b) return a.startOf('day').diff(b.startOf('day'), 'days');
  else return undefined;
}

type DateStringFormat =
  | 'day'
  | 'month'
  | 'date'
  | 'hour'
  | 'datetime'
  | 'fullDate'
  | 'prettyHour'
  | 'dateStr'
  | 'timeStr';
export function formatDateStringDate(
  dateStr: DateInput,
  format: DateStringFormat
): string | undefined {
  const m = toMomentDate(dateStr);
  if (!m) return undefined;
  switch (format) {
    case 'day':
      return capitalizeFirstLetter(m.format('dddd'));
    case 'month':
      return capitalizeFirstLetter(m.format('MMMM'));
    case 'date':
      return m.format('DD/MM/YYYY');
    case 'prettyHour':
      const hours = m.format('HH');
      const minutes = m.format('mm');
      return `${hours}h${minutes === '00' ? '' : minutes}`;
    case 'hour':
      return m.format('HH:mm');
    case 'datetime':
      return `le ${m.format('DD/MM/YYYY')} à ${m.format('HH:mm')}`;
    case 'fullDate':
      return `${capitalizeFirstLetter(m.format('dddd'))} ${m.format(
        'DD MMMM YYYY'
      )}`;
    case 'dateStr':
      return `${m.format(DATE_STR_FORMAT)}`;
    case 'timeStr':
      return `${m.format(TIME_STR_FORMAT)}`;
    default: {
      const invalid: never = format;
      console.error('invalid enum', invalid);
      return undefined;
    }
  }
}
