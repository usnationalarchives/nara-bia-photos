// Detect input method in order to hide outlines in an accessible manner
// https://github.com/ten1seven/what-input
import 'what-input';

// Threespot's CSS Reset
import 'frontline-css-reset';

// Webfonts
import '#assets/fonts/fonts.css';

// import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
