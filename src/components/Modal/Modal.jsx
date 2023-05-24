import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from '../../Icons/close.svg';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal_root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('modal componenDidMount');
    window.addEventListener('keydown', this.handleBackDrop);
  }

  componentWillUnmount() {
    console.log('modal componentWillUnmount');

    window.removeEventListener('keydown', this.handleBackDrop);
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
    const { src, tags } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDrop}>
        <div className={css.modal}>
          <img className={css.modal_image} src={src} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: Proptypes.string.isRequired,
  tags: Proptypes.string.isRequired,
  onClose: Proptypes.func.isRequired,
};
