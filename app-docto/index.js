import React from 'react';
import ReactDom from 'react-dom';
import App from './src/App';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-TPBXL88'
};

TagManager.initialize(tagManagerArgs);

ReactDom.render(React.createElement(App), document.getElementById('app'));
