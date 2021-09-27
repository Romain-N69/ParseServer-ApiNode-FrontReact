import { DoctoButton } from '@components/MaterialUiComponent';
import {
  DoctoCalendar,
  // EventCalendar,
  useStyles as useDoctoCalendarStyles
} from '@components/MaterialUiComponent/DoctoCalendar';
import { AppointmentItemContainer } from '@containers/AppointmentItemContainer';
import { CalendarDialogContainer } from '@containers/CalendarDialogContainer';
import { IDateTimeStr } from '@custom-types/date';
import { TEXTS } from '@data/consts';
import { Appointment } from '@data/models/appointment';
import { capitalizeFirstLetter } from '@helper/string';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@material-ui/icons';
import Timeline from '@material-ui/lab/Timeline'; // tslint:disable-line:no-submodule-imports
import { Medic } from '@src/data/models/medic';
import { formatDateString } from '@src/helper/data/date';
import React, { useState } from 'react';
import { ToolbarProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // tslint:disable-line:no-submodule-imports no-import-side-effect

import { useStyles } from './styles';

type OwnProps = {
  appointments: Appointment[];
  currentDate: IDateTimeStr;
  medic: Medic;
  onChangeDate(date: IDateTimeStr): void;
  onRedirect(path: string): void;
};

type Props = OwnProps;

const CalendarComponentFunc = (props: Props): React.ReactElement | null => {
  const { currentDate, appointments } = props;
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleCloseIsOpenDialog = (): void => {
    setIsOpenDialog(false);
  };

  const handleOpenIsOpenDialog = (): void => {
    setIsOpenDialog(true);
  };

  const classes = useStyles();

  const onChangeDate = (date: IDateTimeStr): void => {
    props.onChangeDate(date);
  };

  const renderAppointments = (): React.ReactElement => (
    <Timeline align={'left'} className={`${classes.appointmentsContainer}`}>
      {appointments.map(
        (appointment): React.ReactElement => {
          return (
            <AppointmentItemContainer
              key={appointment.id}
              appointmentID={appointment.id}
              // appointment={appointment}
            />
          );
        }
      )}
    </Timeline>
  );

  const renderNoAppointments = (): React.ReactElement => (
    <Box display={'flex'} justifyContent={'center'} marginTop={'50px'}>
      <Typography variant={'body1'} component={'div'}>
        {`${TEXTS.calendar.noAppointments}`}
      </Typography>
    </Box>
  );

  const renderAppointmentContainer = (): React.ReactElement => (
    <div>
      <Typography variant={'body1'} component={'div'}>
        <Box fontWeight={'bold'}>
          {`${capitalizeFirstLetter(
            formatDateString(currentDate, 'dddd')
          )} ${formatDateString(currentDate, 'DD MMMM YYYY')}`}
        </Box>
      </Typography>
      {appointments.length > 0 ? renderAppointments() : renderNoAppointments()}
    </div>
  );

  const renderCalendar = (): React.ReactElement => (
    <Grid container={true}>
      <Grid item={true} xs={8}>
        <DoctoCalendar
          onChangeDate={onChangeDate}
          currentDate={currentDate}
          toolbar={renderToolBar}
        />
      </Grid>
      <Grid item={true} xs={4}>
        {renderAppointmentContainer()}
      </Grid>
    </Grid>
  );

  const renderToolBar = (toolbarProps: ToolbarProps): React.ReactElement => {
    const { onNavigate, label } = toolbarProps;
    const onClickToday = (): void => onNavigate('TODAY');
    const onClickPrev = (): void => onNavigate('PREV');
    const onClickNext = (): void => onNavigate('NEXT');

    const DoctoCalendarClasses = useDoctoCalendarStyles();
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        className={`${DoctoCalendarClasses.toolBarContainer}`}>
        <Box display={'flex'} alignItems={'center'} flex={1}>
          <DoctoButton
            className={`${DoctoCalendarClasses.toolBarTodayButton}`}
            onClick={onClickToday}
            myType={'secondary'}>{`${TEXTS.calendar.today}`}</DoctoButton>
          <div className={`${DoctoCalendarClasses.toolBarNavigation}`}>
            <IconButton aria-label={'before'} onClick={onClickPrev}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton aria-label={'next'} onClick={onClickNext}>
              <NavigateNextIcon />
            </IconButton>
          </div>
          <Typography
            variant={'body1'}
            component={'div'}
            className={`${DoctoCalendarClasses.toolBarLabel}`}>
            {label}
          </Typography>
        </Box>
        <DoctoButton onClick={handleOpenIsOpenDialog}>
          {TEXTS.calendar.addWorkingDays}
        </DoctoButton>
      </Box>
    );
  };

  return (
    <Box className={`${classes.container}`}>
      {renderCalendar()}
      <CalendarDialogContainer
        isOpen={isOpenDialog}
        onClose={handleCloseIsOpenDialog}
      />
    </Box>
  );
};

export const CalendarComponent = CalendarComponentFunc;
