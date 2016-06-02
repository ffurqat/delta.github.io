'use strict'

import React, { Component, PropTypes } from 'react';

export default class Spinner extends Component {

  render () {
    return (
      <div className="spinner">
        <div className="image">
          <img src="/images/logo.svg" />
        </div>
      </div>
    )
  }
}

export default Spinner;
