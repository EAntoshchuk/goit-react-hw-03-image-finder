import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import fetchImages from 'Services/FetchImages-api';

export default class ImageGalleryItem extends Component {
  state = {
    image: null,
    isImageLoaded: false,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;
    if (prevRequest !== nextRequest) {
      console.log('changed request');
      console.log(prevProps.request, 'prevRequest');
      console.log(this.props.request, 'nextRequest');
      this.setState({ status: 'pending' });
      fetchImages(nextRequest)
        .then(image => this.setState({ image, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { image, error, status } = this.state;
    const { request } = this.props;

    if (status === 'idle') {
      return <div>enter search request</div>;
    }

    if (status === 'pending') {
      return <div>Loading</div>;
    }

    if (status === ' rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <li className={css.imageGalleryItem}>
          <img
            className={css.imageGalleryItem_image}
            src={this.state.image}
            alt="image"
          />
        </li>
      );
    }
  }
}
