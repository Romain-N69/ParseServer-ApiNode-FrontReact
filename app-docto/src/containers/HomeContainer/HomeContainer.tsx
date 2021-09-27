import { IDateTimeStr } from '@custom-types/date';
import { Medic } from '@src/data/models/Medic';
import { toDateTimeStr } from '@src/helper/data/date';
import React from 'react';

import { HomeComponent } from './HomeComponent';

type OwnProps = {
  medics: Medic[];
};

type DispatchProps = {};

type StateProps = {
  // appointments: Appointment[];
  // events: EventCalendar[];
};

type Props = OwnProps & DispatchProps & StateProps;

const HomeContainerFunc = (props: Props): React.ReactElement | null => {
  const { medics } = props;

  const onChangeDate = (_date: IDateTimeStr): void => {
    // props.editCurrentDate(date);
  };

  const currentDate = toDateTimeStr(new Date());

  return (
    <>
      <HomeComponent
        // events={events}
        currentDate={currentDate}
        // appointments={appointments}
        medics={medics}
        onChangeDate={onChangeDate}
      />
    </>
  );
};

export const HomeContainer = HomeContainerFunc;
