import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class SeachBar extends Component {
  state = {
    hits: '',
  };

  handleImageChange = event => {
    this.setState({ hits: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.hits.trim() === '') {
      return toast.warn('enter search request');
    }
    this.props.onSubmit(this.state.hits);
    this.setState({ hits: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.search_form}>
          <input
            className={css.search_form__input}
            name="imageSearch"
            value={this.state.hits}
            onChange={this.handleImageChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.search_form__button}>
            <span className={css.search_form__button_label}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
