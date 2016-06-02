'use strict'

import React, { Component, PropTypes } from 'react';

export default class VeinServicesList extends Component {

  render () {
    return (
      <section className="services-section">
        <ul>
          <li><h3><a href="#">Digital PR</a></h3></li>
          <li><h3><a href="#">Events</a></h3></li>
          <li><h3><a href="#">Networking</a></h3></li>
          <li><h3><a href="#">Visuals</a></h3></li>
        </ul>
      </section>
    )
  }
}

export default VeinServicesList;
