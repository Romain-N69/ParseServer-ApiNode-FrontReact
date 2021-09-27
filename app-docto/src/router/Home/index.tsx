import { HomeContainer } from '@containers/HomeContainer';
import { Medic } from '@src/data/models/Medic';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { HomeParams } from './params';

type Props = RouteComponentProps<HomeParams>;

export default function Home(props: Props): React.ReactElement {
  const {} = props;

  const medics: Medic[] = [];

  return (
    <>
      <HomeContainer medics={medics} />
    </>
  );
}
