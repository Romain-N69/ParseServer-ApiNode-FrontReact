import { createStyles, Theme } from '@material-ui/core';

// tslint:disable-next-line:typedef
export default (_theme: Theme) =>
  createStyles({
    container: {
      minHeight: 'initial'
    },
    appointmentHoursContainer: {
      flex: 0
    },
    appointmentCardContainer: {
      boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.20)',
      borderRadius: '10px',
      padding: '6px 16px',
      margin: '0px 10px 30px 10px'
    },
    appointmentCardArchivedContainer: {
      opacity: '0.4'
    },
    buttonCard: {
      cursor: 'pointer'
    },
    tagContainer: {},
    tagSeparate: {
      margin: '0px 2px'
    },
    punctualTag: {
      color: '#633129',
      borderRadius: '6px',
      padding: '3px',
      backgroundColor: '#eb7865',
      fontWeight: 'bold'
    },
    archivedTag: {
      borderRadius: '6px',
      padding: '3px',
      fontWeight: 'bold',
      color: '#626262',
      backgroundColor: '#eaeaea'
    }
  });
