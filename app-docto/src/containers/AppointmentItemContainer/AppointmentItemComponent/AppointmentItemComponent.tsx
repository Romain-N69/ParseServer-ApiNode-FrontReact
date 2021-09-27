import { Appointment } from '@data/models/appointment';
import {
  DATE_STR_FRENCH_FORMAT,
  formatDateString,
  TIME_STR_FRENCH_FORMAT
} from '@helper/data/date';
import { Box, Typography, WithStyles, withStyles } from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@material-ui/lab';
import React, { PureComponent } from 'react';

import styles from './styles';

type StyleProps = WithStyles<typeof styles>;

type OwnProps = {
  appointment: Appointment;
  isLastItem: boolean;
  fullNamePatient?: string;
};

type Props = StyleProps & OwnProps;

type State = {};

class AppointmentItemComponentClass extends PureComponent<Props, State> {
  public state: State = {};

  public render(): React.ReactNode {
    const { classes, appointment, isLastItem, fullNamePatient } = this.props;
    return (
      <TimelineItem className={`${classes.container}`}>
        <TimelineOppositeContent className={classes.appointmentHoursContainer}>
          <Typography variant={'body2'}>
            {formatDateString(appointment.startAt, TIME_STR_FRENCH_FORMAT)}
          </Typography>
          <Typography variant={'body2'}>
            {formatDateString(appointment.endAt, TIME_STR_FRENCH_FORMAT)}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          {!isLastItem && <TimelineConnector />}
        </TimelineSeparator>

        <TimelineContent
          className={`${classes.appointmentCardContainer} ${
            appointment.deletedAt !== null
              ? classes.appointmentCardArchivedContainer
              : ''
          }`}>
          <div className={`${classes.buttonCard}`}>
            <Box display={'flex'} className={`${classes.tagContainer}`}>
              {appointment.deletedAt !== null && (
                <Typography
                  variant={'body2'}
                  className={`${classes.archivedTag} ${classes.tagSeparate}`}>{` ${formatDateString(
                  appointment.deletedAt,
                  DATE_STR_FRENCH_FORMAT
                )}`}</Typography>
              )}
            </Box>
            <Typography variant={'body1'} component={'h1'}>
              <Box fontWeight={'bold'}>{`${fullNamePatient}`}</Box>
            </Typography>
          </div>
        </TimelineContent>
      </TimelineItem>
    );
  }
}

export const AppointmentItemComponent = withStyles(styles)(
  AppointmentItemComponentClass
);
