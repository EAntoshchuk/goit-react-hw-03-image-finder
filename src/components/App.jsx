import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import SeachBar from './Searchbar/Searchbar';
import fetchImages from 'Services/FetchImages-api';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    isImageLoaded: false,
    showModal: false,
    hits: [],
    request: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { request: PrevRequest } = prevState;
    console.log(PrevRequest);
    const { request: nextRequest } = this.state;
    console.log(nextRequest);

    if (PrevRequest !== nextRequest) {
      this.setState({ isImageLoaded: true });

      fetchImages(nextRequest)
        .then(res => {
          console.log(res);

          if (res.total === 0) {
            return toast.warn('There is no images with' + ' ' + nextRequest);
          }
          return this.setState(({ hits }) => {
            return { hits: [...hits, ...res.hits] };
          });
        })
        .catch(err => toast.warn(err))
        .finally(() => this.setState({ isImageLoaded: false }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = request => {
    if (request === this.state.request) {
      return toast.info('You`re alredy looking at' + ' ' + request);
    }
    return this.setState({ request, hits: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isImageLoaded, showModal, hits } = this.state;

    return (
      <>
        <div
          style={{
            display: 'flex',
            height: '10vh',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          React-hw-03-Image-Finder
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridGap: '16px',
            paddingBottom: '24px',
          }}
        >
          <ToastContainer autoClose={3000} theme="colored" />
          <SeachBar onSubmit={this.handleFormSubmit} />
          <ImageGallery
            hits={hits}
            alt={hits.tags}
            onClick={this.toggleModal}
          />
          {isImageLoaded && <Loader />}
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              src={hits.largeImageURL}
              tags={hits.tags}
            />
          )}
          {hits.length > 0 && <Button onClick={this.handleLoadMore} />}
        </div>
      </>
    );
  }
}

export default App;
