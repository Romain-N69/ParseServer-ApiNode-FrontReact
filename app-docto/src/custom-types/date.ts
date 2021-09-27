import { Brand } from '@custom-types/index';
import { Moment, MomentInput } from 'moment';

export type IDateTimeStr = Brand<string, 'IDateTimeStr'>;
export type IDateStr = Brand<string, 'IDateStr'>;
export type ITimeStr = Brand<string, 'ITimeStr'>;

export type ValidDateInput = Moment | Date | IDateTimeStr;
export type DateInput = null | undefined | MomentInput | ValidDateInput; // tslint:disable-line: no-null-undefined-union
