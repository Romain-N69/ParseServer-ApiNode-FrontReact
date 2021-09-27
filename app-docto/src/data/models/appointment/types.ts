import { IDateTimeStr } from '@custom-types/date';
import { assertSerializable } from '@custom-types/index';

export type ApiAppointment = {
  id: string;
  start_at: IDateTimeStr;
  end_at: IDateTimeStr;
  patientID: string;
  created_at: IDateTimeStr;
  updated_at: IDateTimeStr;
  deleted_at: IDateTimeStr | null;
};

export type Appointment = {
  id: string;
  startAt: IDateTimeStr;
  endAt: IDateTimeStr;
  patientID: string;
  createdAt: IDateTimeStr;
  updatedAt: IDateTimeStr;
  deletedAt: IDateTimeStr | null;
};

assertSerializable<Appointment>();
assertSerializable<ApiAppointment>();

export const Appointment = (data: Appointment): Appointment => data;
export const ApiAppointment = (data: ApiAppointment): ApiAppointment => data;
export const ApiFormAppointment = (data: ApiAppointment): ApiAppointment =>
  data;
