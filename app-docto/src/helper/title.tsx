import { TEXTS } from '@data/consts';
import React from 'react';
import { Helmet } from 'react-helmet';

export function renderTitle(title: string): React.ReactElement {
  return (
    <Helmet>
      <title>{`${title} - ${TEXTS.baseTitle}`}</title>
    </Helmet>
  );
}
