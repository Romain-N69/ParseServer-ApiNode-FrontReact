import { ApiFormMedic, ApiMedic, Medic } from './types';

function fromApi(apiMedic: Medic): Medic;
function fromApi(apiMedic: Medic[]): Medic[];
function fromApi(apiMedic: Medic | Medic[]): Medic | Medic[] {
  if (Array.isArray(apiMedic)) {
    return apiMedic.map<Medic>(fromApi);
  } else {
    return Medic({
      id: apiMedic.id,
      firstName: apiMedic.firstName,
      lastName: apiMedic.lastName,
      email: apiMedic.email,
      createdAt: apiMedic.createdAt,
      updatedAt: apiMedic.updatedAt
    });
  }
}

function toApi(formMedic: Medic): ApiMedic {
  return ApiFormMedic({
    id: formMedic.id,
    firstname: formMedic.firstName,
    lastname: formMedic.lastName,
    email: formMedic.email,
    created_at: formMedic.createdAt,
    updated_at: formMedic.updatedAt
  });
}

export const MedicFactory = {
  fromApi,
  toApi
};
