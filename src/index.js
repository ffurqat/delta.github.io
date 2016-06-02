'use strict'

// "fetch" global
require('whatwg-fetch')

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import VeinBox from './components/VeinBox';
import logo from './components/logo';
import bubbles from './components/bubbles';

ReactDOM.render(
  <VeinBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
