import React from 'react';
import { render } from 'react-dom';
import App from './App';

const r = (Component) => {
  render(<Component />, document.getElementById('app'))
}

if (module.hot) {
  module.hot.accept('./App', () => {
    r(require('./App').default);
  })
}

r(App);
