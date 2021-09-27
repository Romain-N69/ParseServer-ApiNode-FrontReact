import { ApiAppointment, Appointment, ApiFormAppointment } from './types';

function fromApi(apiAppointment: ApiAppointment): Appointment;
function fromApi(apiAppointment: ApiAppointment[]): Appointment[];
function fromApi(
  apiAppointment: ApiAppointment | ApiAppointment[]
): Appointment | Appointment[] {
  if (Array.isArray(apiAppointment)) {
    return apiAppointment.map<Appointment>(fromApi);
  } else {
    return Appointment({
      id: apiAppointment.id,
      startAt: apiAppointment.start_at,
      endAt: apiAppointment.end_at,
      patientID: apiAppointment.patientID,
      createdAt: apiAppointment.created_at,
      updatedAt: apiAppointment.updated_at,
      deletedAt: apiAppointment.deleted_at
    });
  }
}

function toApi(formAppointment: Appointment): ApiAppointment {
  return ApiFormAppointment({
    id: formAppointment.id,
    start_at: formAppointment.startAt,
    end_at: formAppointment.endAt,
    created_at: formAppointment.createdAt,
    updated_at: formAppointment.updatedAt,
    patientID: formAppointment.patientID,
    deleted_at: formAppointment.deletedAt
  });
}

export const AppointmentFactory = {
  fromApi,
  toApi
};
