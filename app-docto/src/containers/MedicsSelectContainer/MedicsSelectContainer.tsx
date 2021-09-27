import React from 'react';

// import { MedicsSelectComponent } from './MedicsSelectComponent';

type OwnProps = {};

type DispatchProps = {
  // editCurrentMedicID(MedicID: string): void;
};

type StateProps = {
  // Medics: Array<{ value: string; label: string }>;
  // currentRound: { value: string; label: string } | null;
};

type Props = OwnProps & StateProps & DispatchProps;

const MedicsSelectContainerFunc = (
  _props: Props
): React.ReactElement | null => {
  // const { Medics, currentRound } = props;

  // useEffect((): void => {
  //   if (currentRound === null) {
  //     if (Medics.length > 0) {
  //       props.editCurrentMedicID(Medics[0].value);
  //     }
  //   }
  // }, [currentRound]);

  // if (currentRound === null) return null;

  // const onChangeCurrentMedicID = (value: string | null): void => {
  //   if (value !== null) {
  //     props.editCurrentMedicID(value);
  //   }
  // };

  return <> </>;

  // return (
  //   <MedicsSelectComponent
  //     Medics={Medics}
  //     currentRound={currentRound}
  //     onChangeCurrentMedicId={onChangeCurrentMedicID}
  //   />
  // );
};

export const MedicsSelectContainer = MedicsSelectContainerFunc;
