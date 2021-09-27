import { createStyles, Theme } from '@material-ui/core';

// tslint:disable-next-line:typedef
export default (theme: Theme) =>
  createStyles({
    appContainer: {
      display: 'flex'
    },
    warning: {
      fontWeight: 'bold',
      fontSize: 'auto',
      alignItems: 'center',
      placeContent: 'center',
      textTransform: 'uppercase',
      weight: '100%'
    },
    warningDate: {
      fontWeight: 'bold',
      textColor: '#ff0000'
    },
    appToolbar: {
      ...theme.mixins.toolbar
    },
    appContent: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    }
  });
