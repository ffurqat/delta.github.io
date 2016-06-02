'use strict'

import React, { Component, PropTypes } from 'react';

import VeinLogo from './VeinLogo';
import Spinner from './Spinner';
import VeinPortfolioList from './VeinPortfolioList';

import Scroll from 'react-scroll';

const Link = Scroll.Link;
const Element = Scroll.Element;
const Events  = Scroll.Events;
const scroll  = Scroll.animateScroll;

require("../style/VeinBox.scss");

export default class VeinBox extends Component {

  componentDidMount () {

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

  }

  componentWillUnmount () {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  scrollToTop () {
    scroll.scrollToTop();
  }

  render () {
    return (
      <div className="vein-box">
      </div>
    )
  }
}

export default VeinBox;
