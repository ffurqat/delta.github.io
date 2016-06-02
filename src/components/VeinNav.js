'use strict'

import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';

const Link = Scroll.Link;
const Element = Scroll.Element;
const Events  = Scroll.Events;
const scroll  = Scroll.animateScroll;

export default class VeinNav extends Component {

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
      <nav className="vein-nav">
        <ul className="social">
          <Link activeClass="active" to="test1" spy={true} smooth={true} offset={50} duration={500} >Test 1</Link>
          <li><a href="#">Кто мы</a></li>
          <li><a href="#">Лучшие проекты</a></li>
          <li><a href="#">Что мы делаем</a></li>
          <li><a href="#">Наши клиенты</a></li>
          <li><a href="#">Контакты</a></li>

          <Element name="test1" className="element">
            test 1
          </Element>
        </ul>
      </nav>
    )
  }
}

export default VeinNav;
