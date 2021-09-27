import { ITimeStr } from '@custom-types/date';

export const DATE_STR_FORMAT = 'YYYY-MM-DD';
export const TIME_STR_FORMAT = 'HH[:]mm';

export const DATE_STR_FRENCH_FORMAT = 'DD/MM/YYYY';
export const TIME_STR_FRENCH_FORMAT = 'HH[h]mm';

export const TIME_STR_MIDNIGHT = '00:00' as ITimeStr;

export enum ScheduleDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}

export const SCHEDULE_DAY_TO_LABEL_MAP: {
  [K in ScheduleDay]: string;
} = {
  [ScheduleDay.Monday]: 'Lundi',
  [ScheduleDay.Tuesday]: 'Mardi',
  [ScheduleDay.Wednesday]: 'Mercredi',
  [ScheduleDay.Thursday]: 'Jeudi',
  [ScheduleDay.Friday]: 'Vendredi',
  [ScheduleDay.Saturday]: 'Samedi',
  [ScheduleDay.Sunday]: 'Dimanche'
};
