// import { EventCalendar } from '@components/MaterialUiComponent/DoctoCalendar';
import { IDateTimeStr } from '@custom-types/date';
import { Appointment } from '@data/models/appointment';
import { Medic } from '@data/models/medic';
import React from 'react';

import { CalendarComponent } from './CalendarComponent';

type OwnProps = {
  medic: Medic;
  onRedirect(path: string): void;
};

type DispatchProps = {};

type StateProps = {
  currentDate: IDateTimeStr;
  appointments: Appointment[];
};

type Props = OwnProps & DispatchProps & StateProps;

const CalendarContainerFunc = (props: Props): React.ReactElement | null => {
  const { appointments, medic, currentDate } = props;

  const onChangeDate = (_date: IDateTimeStr): void => {};

  const onRedirect = (path: string): void => props.onRedirect(path);

  return (
    <CalendarComponent
      currentDate={currentDate}
      medic={medic}
      appointments={appointments}
      onChangeDate={onChangeDate}
      onRedirect={onRedirect}
    />
  );
};

export const CalendarContainer = CalendarContainerFunc;
