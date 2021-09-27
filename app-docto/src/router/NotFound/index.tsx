import { TEXTS } from '@data/consts';
import { renderTitle } from '@helper/title';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default function NotFound({
  location
}: RouteComponentProps): React.ReactElement {
  return (
    <div>
      {renderTitle(TEXTS.pageNotFound)}
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
