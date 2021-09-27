import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { ClassKeyOfStyles, ClassNameMap } from '@material-ui/styles/withStyles'; // tslint:disable-line:no-submodule-imports
import React from 'react';

// tslint:disable:typedef
const styles = (theme: Theme) =>
  createStyles({
    root: {},
    paper: {
      marginBottom: theme.spacing(2)
    },
    table: {
      display: 'inline-table',
      overflowX: 'auto'
    },
    tableHead: {
      backgroundColor: '#f1f1f1'
    },
    firstCell: { padding: '5px' },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },
    link: {
      cursor: 'pointer'
    }
  });
// tslint:enable:typedef

type Order = 'asc' | 'desc';

export interface IHeadCell<T> {
  id: keyof T;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

type StyleProps = WithStyles<typeof styles>;

type OwnProps<_T, _A> = {
  headCells: any;
  rows: any;
};

type EnhancedTableProps<T> = {
  classes: ClassNameMap<ClassKeyOfStyles<typeof styles>>;
  order: Order;
  orderBy: keyof T;
  headCells: Array<IHeadCell<T>>;
  onRequestSort(event: React.MouseEvent<unknown>, property: keyof T): void;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b): number => descendingComparator(a, b, orderBy)
    : (a, b): number => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map(
    (el, index): [T, number] => [el, index] as [T, number]
  );
  stabilizedThis.sort((a, b): number => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el): T => el[0]);
}

function EnhancedTableHead<T>(
  props: EnhancedTableProps<T>
): React.ReactElement {
  const { classes, order, orderBy, headCells, onRequestSort } = props;
  const createSortHandler = (property: keyof T): any => (
    event: React.MouseEvent<unknown>
  ): void => onRequestSort(event, property);

  return (
    <TableHead className={`${classes.tableHead}`}>
      <TableRow>
        {headCells.map(
          (headCell, index): React.ReactElement => (
            <TableCell
              key={headCell.id as string}
              className={`${index === 0 ? classes.firstCell : ''}`}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

function DoctoTableFunc<T extends any, A extends any>(
  props: OwnProps<T, A> & StyleProps
): React.ReactElement {
  const { headCells, classes, rows } = props;
  if (headCells.length === 0) {
    return <></>;
  }
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T
  ): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={`${classes.root}`}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby={'tableTitle'}
            size={'medium'}
            aria-label={'enhanced table'}>
            <EnhancedTableHead
              headCells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row: any, index): React.ReactElement => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const onClick: any = Object.keys(row).find(
                    (value): boolean => value === 'onClick'
                  )
                    ? row.onClick
                    : undefined;
                  return (
                    <TableRow
                      hover={true}
                      className={`${onClick && classes.link} ${
                        row.className ? row.className : ''
                      }`}
                      tabIndex={-1}
                      onClick={(): void => onClick && onClick()} // tslint:disable-line:jsx-no-lambda
                      key={`${row[Object.keys(row)[0]]}-${index}`}>
                      {Object.keys(row).map(
                        (key, indexRow): React.ReactElement | null => {
                          if (key !== 'onClick' && key !== 'className') {
                            if (indexRow === 0) {
                              return (
                                <TableCell
                                  className={`${classes.firstCell}`}
                                  component={'th'}
                                  key={`${labelId}-${indexRow}`}
                                  id={`${labelId}`}
                                  scope={'row'}
                                  padding={'none'}>
                                  <Typography variant={'subtitle1'}>
                                    {row[key]}
                                  </Typography>
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell
                                  key={`${labelId}-${indexRow}`}
                                  align={'right'}>
                                  <Typography variant={'subtitle1'}>
                                    {row[key]}
                                  </Typography>
                                </TableCell>
                              );
                            }
                          }
                          return null;
                        }
                      )}
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export const DoctoTable = withStyles(styles)(DoctoTableFunc);
