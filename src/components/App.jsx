import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import { ReactComponent as CloseIcon } from '../Icons/close.svg';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import SeachBar from './Searchbar/Searchbar';
// import ImageChanger from './ImageChanger/ImageChanger';

class App extends Component {
  state = {
    isImageLoaded: false,
    showModal: false,
    hits: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ isImageLoaded: false });
    }
  }

  async componentDidMount() {
    this.setState({ isImageLoaded: true });

    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=35004383-5cd2ee797d433f0b9be31b1f4&image_type=photo&orientation=horizontal&per_page=12'
    )
      .then(response => response.json())
      // .then(console.log)
      .then(hits => this.setState({ hits }))
      .finally(() => this.setState({ isImageLoaded: false }));
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = hits => {
    console.log(hits);
    this.setState({ hits });
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
          {this.state.isImageLoaded && <h2>loading</h2>}
          {this.state.hits && (
            <div>
              <img src={hits.webformatURL} alt="image" />
            </div>
          )}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <Button onClick={this.toggleModal}></Button>
              <button type="button" onClick={this.toggleModal}>
                Close modalWindow
              </button>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default App;
