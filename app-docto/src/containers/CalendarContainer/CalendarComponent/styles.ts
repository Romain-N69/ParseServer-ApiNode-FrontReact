import { createStyles, makeStyles } from '@material-ui/core';

// tslint:disable-next-line:typedef
export const useStyles = makeStyles(theme =>
  createStyles({
    container: {},
    userContainer: {},
    userColor: {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      margin: '0px 10px'
    },
    eventWrapperContainer: {
      border: 'none',
      boxSizing: 'border-box',
      boxShadow: 'none',
      margin: '0px',
      padding: '2px 5px',
      borderRadius: '5px',
      color: '#fff',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left'
    },
    eventWrapperContent: {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    appointmentsContainer: {
      margin: '10px 0px',
      padding: '0px 0px',

      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100vh',
      overflowX: 'scroll',
      flexDirection: 'column'
    },
    appointmentCardContainer: {
      borderRadius: '20px',
      padding: '6px 16px'
    },
    appointmentHoursContainer: {
      flex: 0
    }
  })
);
