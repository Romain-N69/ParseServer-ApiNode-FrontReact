import React from 'react';
import Select from 'react-select';

import { useStyles } from './styles';

type Props = {
  Medics: Array<{ value: string; label: string }>;
  currentRound: { value: string; label: string };
  onChangeCurrentMedicId(value: string | null): void;
};

const MedicsSelectComponentFunc = (props: Props): React.ReactElement | null => {
  const { Medics, currentRound } = props;

  const classes = useStyles();

  const onChangeCurrentMedicId = (value: {
    value: string;
    label: string;
  }): void => {
    props.onChangeCurrentMedicId(value.value);
  };

  return (
    <Select
      className={classes.container}
      styles={{
        // Fixes the overlapping problem of the component
        menu: provided => ({ ...provided, zIndex: 9999 })
      }}
      value={currentRound}
      isSearchable={false}
      onChange={onChangeCurrentMedicId as any}
      options={Medics as any}
    />
  );
};

export const MedicsSelectComponent = MedicsSelectComponentFunc;
