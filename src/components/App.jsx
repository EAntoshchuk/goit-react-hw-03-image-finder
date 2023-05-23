import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { ReactComponent as CloseIcon } from '../Icons/close.svg';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import SeachBar from './Searchbar/Searchbar';
import fetchImages from 'Services/FetchImages-api';
import Loader from './Loader/Loader';
// import ImageChanger from './ImageChanger/ImageChanger';

class App extends Component {
  state = {
    isImageLoaded: false,
    showModal: false,
    hits: [],
    request: '',
  };

  async componentDidMount(prevProps, prevState) {
    const prevRequest = prevState.request;
    console.log(prevRequest);
    const nextRequest = this.state.request;
    console.log(nextRequest);

    if (prevRequest !== nextRequest) {
      this.setState({ isImageLoaded: true });

      fetchImages(nextRequest)
        .then(res => {
          return this.setState(({ hits }) => {
            return { hits: [...hits, ...res.hits] };
          });
        })
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
      return toast.info('You`ve alredy entered this request');
    }
    console.log(request);
    this.setState({ request, hits: [] });
  };

  render() {
    const { isImageLoaded, showModal, hits } = this.state;
    const { url } = this.props;
    const showLoader = url && !isImageLoaded;
    const imageSize = isImageLoaded ? '100' : 0;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <div
          style={{
            height: '10vh',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          React-hw-03-Image-Finder
        </div>
        <div>
          <button type="button" onClick={this.toggleModal}>
            Open modalWindow
          </button>
        </div>

        <div>
          <ToastContainer autoClose={3000} theme="colored" />
          <SeachBar onSubmit={this.handleFormSubmit} />
          <ImageGallery hits={hits} onClick={this.toggleModal} />

          {isImageLoaded && <Loader />}
          {hits && (
            <div>
              <img src={hits['webformatURL']} alt="image" />
            </div>
          )}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <button type="button" onClick={this.toggleModal}>
                Close modalWindow
              </button>
            </Modal>
          )}
          <Button onClick={this.toggleModal}></Button>
        </div>
      </div>
    );
  }
}

export default App;
