import {
  DoctoCalendar,
  EventCalendar
} from '@components/MaterialUiComponent/DoctoCalendar';
import { MedicsSelectContainer } from '@containers/MedicsSelectContainer';
import { IDateTimeStr } from '@custom-types/date';
import { Dialog, Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { TEXTS } from '@src/data/consts';
import React from 'react';

import { useStyles } from './styles';

type Props = {
  events?: EventCalendar[];
  isOpen: boolean;
  currentDate?: IDateTimeStr;
  onChangeDate?(date: IDateTimeStr): void;
  onClose(): void;
};

const CalendarDialogComponentFunc = (
  props: Props
): React.ReactElement | null => {
  const { events, isOpen, currentDate } = props;

  const classes = useStyles();

  const onChangeDate = (_date: IDateTimeStr): void => {
    // props.onChangeDate(date);
  };

  const onClose = (): void => {
    props.onClose();
  };

  const renderEventWrapper = ({
    event
  }: {
    event: EventCalendar;
  }): React.ReactElement => {
    const { color, title } = event;

    return (
      <div
        className={classes.eventWrapperContainer}
        style={{ backgroundColor: color }}>
        <div className={classes.eventWrapperContent} title={title}>
          {title}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={'lg'} onClose={onClose}>
      <CloseIcon
        fontSize={'large'}
        onClick={onClose}
        className={`${classes.closeIcon}`}
      />
      <Grid container={true} className={`${classes.container}`}>
        <Grid item={true} xs={6} className={`${classes.side}`}>
          <MedicsSelectContainer />
          <DoctoCalendar
            className={`${classes.calendarContainer}`}
            currentDate={currentDate}
            eventWrapper={renderEventWrapper}
            onChangeDate={onChangeDate}
            events={events}
          />
        </Grid>
        <Grid
          container={true}
          item={true}
          xs={6}
          direction={'column'}
          justify={'space-around'}
          className={`${classes.side}`}>
          <button
            title={TEXTS.validate}
            className={`${classes.validateButton}`}
            onClick={onClose}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export const CalendarDialogComponent = CalendarDialogComponentFunc;
