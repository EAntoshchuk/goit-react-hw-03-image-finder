import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ children, onClick, ...allyProps }) {
  return (
    <button type="button" className={css.btn} onClick={onClick} {...allyProps}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
