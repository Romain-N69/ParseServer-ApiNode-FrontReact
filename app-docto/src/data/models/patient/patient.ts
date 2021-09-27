import { ApiFormPatient, ApiPatient, FormPatient, Patient } from './types';

function fromApi(apiPatient: ApiPatient): Patient;
function fromApi(apiPatient: ApiPatient[]): Patient[];
function fromApi(apiPatient: ApiPatient | ApiPatient[]): Patient | Patient[] {
  if (Array.isArray(apiPatient)) {
    return apiPatient.map<Patient>(fromApi);
  } else {
    return Patient({
      id: apiPatient.id,
      firstName: apiPatient.firstname,
      lastName: apiPatient.lastname,
      gender: apiPatient.gender,
      birthDate: apiPatient.birthdate,
      createdAt: apiPatient.created_at,
      updatedAt: apiPatient.updated_at,
      deletedAt: apiPatient.deleted_at
    });
  }
}

function toApi(formPatient: FormPatient): ApiFormPatient {
  return ApiFormPatient({
    firstname: formPatient.firstName,
    lastname: formPatient.lastName,
    gender: formPatient.gender,
    birthdate: formPatient.birthDate
  });
}

export const PatientFactory = {
  fromApi,
  toApi
};
