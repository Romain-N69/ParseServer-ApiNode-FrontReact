import { IDateTimeStr } from '@custom-types/date';
import { assertSerializable } from '@custom-types/index';

export type ApiMedic = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  created_at: IDateTimeStr;
  updated_at: IDateTimeStr;
};

export type Medic = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: IDateTimeStr;
  updatedAt: IDateTimeStr;
};

assertSerializable<Medic>();
assertSerializable<ApiMedic>();

export const Medic = (data: Medic): Medic => data;
export const ApiFormMedic = (data: ApiMedic): ApiMedic => data;
