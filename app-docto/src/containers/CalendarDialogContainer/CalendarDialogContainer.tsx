import { IDateTimeStr } from '@custom-types/date';
import React from 'react';

import { CalendarDialogComponent } from './CalendarDialogComponent';

type OwnProps = {
  isOpen: boolean;
  onClose(): void;
};

type DispatchProps = {};

type StateProps = {
  currentMedicId?: string | null;
  currentDate?: IDateTimeStr;
  // events: EventCalendar[];
};

type Props = OwnProps & StateProps & DispatchProps;

const CalendarDialogContainerFunc = (
  props: Props
): React.ReactElement | null => {
  const { isOpen, currentDate } = props;

  const onClose = (): void => {
    props.onClose();
  };

  return (
    <CalendarDialogComponent
      // events={events}
      isOpen={isOpen}
      currentDate={currentDate}
      onClose={onClose}
      // onChangeDate={onChangeDate}
    />
  );
};

export const CalendarDialogContainer = CalendarDialogContainerFunc;
