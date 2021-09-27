import { IDateStr, IDateTimeStr } from '@custom-types/date';
import { assertSerializable } from '@custom-types/index';

export enum Gender {
  Man = 'homme',
  Woman = 'femme'
}

export type ApiPatient = {
  id: string;
  firstname: string | null;
  lastname: string;
  gender: Gender | null;
  birthdate: IDateStr | null;
  deleted_at: IDateTimeStr | null;
  created_at: IDateTimeStr;
  updated_at: IDateTimeStr;
};

export type Patient = {
  id: string;
  firstName: string | null;
  lastName: string;
  gender: Gender | null;
  birthDate: IDateStr | null;
  createdAt: IDateTimeStr;
  updatedAt: IDateTimeStr;
  deletedAt: IDateTimeStr | null;
};

export type FormPatient = Pick<
  Patient,
  'firstName' | 'lastName' | 'gender' | 'birthDate'
>;

export type ApiFormPatient = Pick<
  ApiPatient,
  'firstname' | 'lastname' | 'gender' | 'birthdate'
>;

assertSerializable<Patient>();
assertSerializable<ApiPatient>();
assertSerializable<FormPatient>();
assertSerializable<ApiFormPatient>();

export const Patient = (data: Patient): Patient => data;
export const ApiPatient = (data: ApiPatient): ApiPatient => data;
export const FormPatient = (data: FormPatient): FormPatient => data;
export const ApiFormPatient = (data: ApiFormPatient): ApiFormPatient => data;
