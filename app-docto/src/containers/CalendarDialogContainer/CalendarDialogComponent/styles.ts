import { makeStyles } from '@material-ui/core';

// tslint:disable-next-line:typedef
export const useStyles = makeStyles(_theme => ({
  container: {
    padding: '0px 0px'
  },

  side: {
    padding: '60px 60px'
  },

  calendarContainer: {
    height: 'initial'
  },

  closeIcon: {
    margin: 5,
    cursor: 'pointer'
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

  validateButton: {
    margin: '0px 100px',
    cursor: 'pointer'
  }
}));
