import {
  DoctoCalendar,
  EventCalendar
} from '@components/MaterialUiComponent/DoctoCalendar';
import { AppointmentItemContainer } from '@containers/AppointmentItemContainer';
import { IDateTimeStr } from '@custom-types/date';
import { Appointment } from '@data/models/appointment';
import { Medic } from '@data/models/Medic';
import { capitalizeFirstLetter } from '@helper/string';
import {
  Box,
  Container,
  Grid,
  FormControlLabel,
  FormHelperText,
  Switch,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import { Timeline } from '@material-ui/lab';
import { MedicsSelectContainer } from '@src/containers/MedicsSelectContainer';
import { formatDateString } from '@src/helper/data/date';
import React, { useState } from 'react';
import styles from './styles';

type StyleProps = WithStyles<typeof styles>;

type OwnProps = {
  appointments?: Appointment[];
  currentDate: IDateTimeStr;
  medics: Medic[];
  onChangeDate(date: IDateTimeStr): void;
};

type Props = StyleProps & OwnProps;

const HomeComponentClass = (props: Props): React.ReactElement => {
  const { classes } = props;

  const [modeMedic, setModeMedic] = useState(false);

  const _renderHeader = (): React.ReactElement => {
    return (
      <div className={classes.headerDiv}>
        <Typography component="legend">Vous êtes Médecin Patient ?</Typography>
        <FormControlLabel
          control={
            <Switch
              className={classes.switch}
              checked={modeMedic}
              onChange={handleChange}
              name="medic"
            />
          }
          label="Médecin"
        />
        <FormHelperText>Choisissez votre rôle.</FormHelperText>
      </div>
    );
  };

  const handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setModeMedic(checked);
  };

  const _onChangeDate = (): void => {};

  const _renderCalendar = (): React.ReactElement => {
    const { classes } = props;
    return (
      <Grid container={true} justify={'center'}>
        <Grid item={true} xs={5} className={`${classes.calendarGridContainer}`}>
          <DoctoCalendar
            className={`${classes.calendarContainer}`}
            onChangeDate={_onChangeDate}
            // events={events}
            eventWrapper={_renderEventWrapper}
          />
        </Grid>
        <Grid item={true} xs={5} className={`${classes.calendarGridContainer}`}>
          <MedicsSelectContainer />
          {_renderAppointmentContainer()}
        </Grid>
      </Grid>
    );
  };

  const _renderEventWrapper = ({
    event
  }: {
    event: EventCalendar;
  }): React.ReactElement => {
    const { classes } = props;
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

  const _renderAppointmentContainer = (): React.ReactElement => {
    const { appointments, currentDate, classes } = props;
    return (
      <div className={`${classes.appointmentsContainer}`}>
        <Typography
          variant={'body1'}
          component={'div'}
          className={classes.appointmentsTitleDate}>
          <Box fontWeight={'bold'}>
            {`${capitalizeFirstLetter(
              formatDateString(currentDate, 'dddd')
            )} ${formatDateString(currentDate, 'DD MMMM YYYY')}`}
          </Box>
        </Typography>
        {appointments ? _renderAppointments() : null}
      </div>
    );
  };

  // const _renderNoAppointments = (): React.ReactElement => {
  //   const { classes } = props;
  //   return (
  //     <Box display={'flex'} justifyContent={'center'} marginTop={'50px'}>
  //       <Typography
  //         variant={'body1'}
  //         component={'div'}
  //         className={classes.appointmentsTitleDate}>
  //         {`${TEXTS.calendar.noAppointments}`}
  //       </Typography>
  //     </Box>
  //   );
  // };

  const _renderAppointments = (): React.ReactElement | null => {
    const { appointments } = props;
    if (!appointments) return null;
    return (
      <Timeline align={'left'}>
        {appointments.map(
          (appointment): React.ReactElement => (
            <AppointmentItemContainer
              key={appointment.id}
              appointmentID={appointment.id}
              // appointment={}
            />
          )
        )}
      </Timeline>
    );
  };

  return (
    <Container component={'main'} maxWidth={'lg'} className={classes.container}>
      {_renderHeader()}
      {!modeMedic && _renderCalendar()}
    </Container>
  );
};

export const HomeComponent = withStyles(styles)(HomeComponentClass);
