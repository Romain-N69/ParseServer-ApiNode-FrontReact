import { createStyles, Theme } from '@material-ui/core';

// tslint:disable-next-line:typedef
export default (theme: Theme) =>
  createStyles({
    container: {},
    containerBis: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    calendarContainer: {
      height: '50vh'
    },
    postFormGridContainer: {
      margin: '0 auto'
    },
    postFormContainer: {
      backgroundColor: '#FFF',
      padding: '10px',
      margin: '10px',
      borderRadius: '20px',
      width: '70%'
    },
    postFormSearchInput: {
      padding: '10px',
      width: '70%'
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
    calendarGridContainer: {
      margin: '10px 10px',
      padding: '10px 10px',
      backgroundColor: '#FFF',
      borderRadius: '26px'
    },
    appointmentsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '500px',
      overflowX: 'scroll'
    },
    appointmentsTitleDate: {},
    headerDiv: {
      height: '100%',
      width: '100%'
    },
    switch: {
      padding: 8,
      '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 17,
          height: 18
        },
        '&:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main)
          )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
          left: 12
        },
        '&:after': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main)
          )}" d="M19,13H5V11H19V13Z" /></svg>')`,
          right: 12
        }
      },
      '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2
      }
    }
  });
