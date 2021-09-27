import { DoctoButton } from '@components/MaterialUiComponent/DoctoButton';
import { IDateTimeStr } from '@custom-types/date';
import { COLORS, TEXTS } from '@data/consts';
import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
// tslint:disable-next-line: ordered-imports no-import-side-effect
import '@src/css/react-big-calendar.css';
import {
  Calendar,
  Event,
  HeaderProps,
  momentLocalizer,
  stringOrDate,
  ToolbarProps
} from 'react-big-calendar';
import { toDateTimeStr, toDate } from '@src/helper/data/date';

// tslint:disable:typedef
export const useStyles = makeStyles(_theme =>
  createStyles({
    container: {
      height: 'calc(100vh - 100px)'
    },
    calendar: {
      minHeight: '500px'
    },

    currentTileCalendar: {
      backgroundColor: COLORS.secondary[4]
    },

    toolBarContainer: {
      margin: '10px 10px'
    },

    toolBarTodayButton: {
      textTransform: 'initial',
      padding: '0px 12px'
    },
    toolBarNavigation: {},
    toolBarLabel: {
      textTransform: 'capitalize'
    },

    header: {
      textAlign: 'center',
      textTransform: 'uppercase'
    },

    dateHeader: {
      textAlign: 'center',
      fontSize: '12px',
      height: '24px',
      lineHeight: '24px',
      minWidth: '24px'
    },

    dateTodayHeader: {
      color: '#FFF',
      backgroundColor: '#1a73e8',
      borderRadius: '50%',
      display: 'inline-block',
      marginTop: '3px'
    }
  })
);
// tslint:enable:typedef

export type EventCalendar = Event & { color: string };

type OwnProps = {
  className?: string;
  events?: EventCalendar[];
  currentDate?: IDateTimeStr;
  eventWrapper?({ event }: { event: EventCalendar }): React.ReactElement;
  toolbar?(props: ToolbarProps): React.ReactElement;
  onChangeDate?(date: IDateTimeStr): void;
};

type Props = OwnProps;

const localizer = momentLocalizer(moment);

const DoctoCalendarFunc = (props: Props): React.ReactElement => {
  const { events, onChangeDate, eventWrapper, toolbar, className } = props;
  const [currentDate, setCurrentDate] = useState(
    props.currentDate
      ? props.currentDate
      : toDateTimeStr(new Date(new Date().setHours(0, 0, 0, 0)))
  );

  const classes = useStyles();
  const renderToolBar = (toolbarProps: ToolbarProps): React.ReactElement => {
    const { onNavigate, label } = toolbarProps;
    const onClickToday = (): void => onNavigate('TODAY');
    const onClickPrev = (): void => onNavigate('PREV');
    const onClickNext = (): void => onNavigate('NEXT');
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        className={`${classes.toolBarContainer}`}>
        <DoctoButton
          className={`${classes.toolBarTodayButton}`}
          onClick={onClickToday}
          myType={'secondary'}>{`${TEXTS.calendar.today}`}</DoctoButton>
        <div className={`${classes.toolBarNavigation}`}>
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
          className={`${classes.toolBarLabel}`}>
          {label}
        </Typography>
      </Box>
    );
  };

  const header = (headerProps: HeaderProps): React.ReactElement => {
    const { label } = headerProps;
    return (
      <Typography component={'div'} className={classes.header}>
        {label}
      </Typography>
    );
  };

  const dateHeader = (dateHeaderProps: any): React.ReactElement => {
    const { label, date } = dateHeaderProps;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isToday = today.getTime() === date.getTime();

    return (
      <Typography
        component={'div'}
        className={`${classes.dateHeader} ${
          isToday ? classes.dateTodayHeader : ''
        }`}>
        {label}
      </Typography>
    );
  };

  const customDayPropGetter = (
    date: Date
  ): React.HTMLAttributes<HTMLDivElement> => {
    if (toDate(currentDate).getTime() === date.getTime()) {
      return {
        className: `${classes.currentTileCalendar}`
      };
    } else return {};
  };

  const onSelectSlot = (slotInfo: {
    start: stringOrDate;
    end: stringOrDate;
    slots: Date[] | string[];
    action: 'select' | 'click' | 'doubleClick';
  }): void => {
    setCurrentDate(toDateTimeStr(slotInfo.slots[0] as Date));
    if (onChangeDate) {
      onChangeDate(toDateTimeStr(slotInfo.slots[0] as Date));
    }
  };

  return (
    <div className={`${classes.container} ${className ? className : ''}`}>
      <Calendar
        selectable={true}
        localizer={localizer}
        defaultView={'month'}
        events={events ? events : []}
        className={`${classes.calendar} ${className ? className : ''}`}
        dayPropGetter={customDayPropGetter}
        onSelectSlot={onSelectSlot}
        views={{ month: true }}
        components={{
          eventWrapper,
          toolbar: toolbar ? toolbar : renderToolBar,
          header,
          month: {
            dateHeader
          }
        }}
      />
    </div>
  );
};

export const DoctoCalendar = DoctoCalendarFunc;
