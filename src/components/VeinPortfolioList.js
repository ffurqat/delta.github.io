'use strict'

const body = document.getElementById('body');


import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
const Link = Scroll.Link;
var Element  = Scroll.Element;
var Events  = Scroll.Events;
import VeinServicesList from './VeinServicesList';

export default class VeinPortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = { title: null, description: null, popupIsClosed: true };
  }
  handleClick (work) {
    this.setState({
      title: work.title,
      description: work.description,
      popupIsClosed: false
    });

    this.fixBody();
  }
  fixBody () {
    const slide = document.getElementsByClassName('slide')[0];
    body.classList.add('active');
    slide.classList.add('active');
  }
  unFixBody () {
    const slide = document.getElementsByClassName('slide')[0];
    body.classList.remove('active');
    slide.classList.remove('active');
  }
  handleClose () {
    this.setState({
      popupIsClosed: true
    });

    this.unFixBody();

    setTimeout(() => {
      this.setState({
        title: null,
        description: null
      });
    }, 200)
  }
  setDescription () {
    return { __html: this.state.description.toString() };
  }
  setTitle () {
    return { __html: this.state.title.toString() };
  }
  renderPopup () {
    if (!this.state.description) return

    return (
      <div>
        <button onClick={ this.handleClose.bind(this) }>Закрыть</button>
        <h1>{ this.state.title }</h1>
        <div className="description" dangerouslySetInnerHTML={ this.setDescription() } />
      </div>
    )
  }
  render () {
    return (
      <div className="main-content">
        <div className="slide">
          <div className="vein-logo">
            <a href="#">
              <img src="/images/logo.svg" />
              <span className="accent">Vein</span>
              <span>Technologies</span>
            </a>
          </div>
          <Link to="contacts" smooth={true} className="contacts-button">Контакты</Link>
          <section className="about-section">
            <h1>
              <p>VeinTechnologies&nbsp;&mdash; это маркетинговое агентство, которое с&nbsp;2011 года реализовало более 200 проектов различной сложности для глобальных компаний, российских корпоративных заказчиков и&nbsp;госсектора.</p>
              <p>Наша основная ценность&nbsp;&mdash; высокие стандарты <nobr>аккаунт-менеджмента</nobr>.</p>
            </h1>
            <VeinServicesList />
          </section>
          <h2 className="portfolio-title">Избранные работы</h2>
          <section className="portfolio-section">
            {this.props.portfolio.map(work =>
              <article onClick={ this.handleClick.bind(this, work) } key={ work.title } >
                <div className="image"><img src={ work.image } /></div>
                <h3>{ work.title }</h3>
              </article>
            )}
          </section>
          <section className="clients-section">
            <h2>Наши клиенты</h2>
            <div>
              <div className="logo"><img src="images/logos/klients_logo-01.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-02.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-03.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-04.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-05.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-06.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-07.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-08.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-09.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-10.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-11.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-12.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-13.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-14.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-15.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-16.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-17.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-18.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-19.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-20.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-21.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-22.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-23.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-24.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-25.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-26.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-27.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-28.jpg" /></div>
              <div className="logo"><img src="images/logos/klients_logo-29.jpg" /></div>
            </div>
          </section>
          <Element name="contacts">
            <footer className="vein-footer">
              <h2>Контакты</h2>
              <h3 className="messages">
              </h3>
            </footer>
          </Element>
        </div>
        <div className={ this.state.popupIsClosed ? 'hidden popup':'active popup' }>
          <div className="popup-wrapper">
            { this.renderPopup() }
          </div>
        </div>
      </div>
    )
  }
}

VeinPortfolioList.propTypes = {
  portfolio: PropTypes.array.isRequired
}

export default VeinPortfolioList;
