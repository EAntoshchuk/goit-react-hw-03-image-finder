import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal_root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('modal componenDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('modal componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // handleKeyDown = event => {
  //   if (event.code === 'Escape') {
  //     //   console.log('escape pushed');
  //     this.props.onClose();
  //   }
  // };

  handleBackDrop = event => {
    // console.log('currentTarget', event.currentTarget);
    // console.log('target', event.target);
    if (event.currentTarget === event.target || event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDrop}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: Proptypes.string.isRequired,
  alt: Proptypes.string.isRequired,
  onClose: Proptypes.func.isRequired,
};
