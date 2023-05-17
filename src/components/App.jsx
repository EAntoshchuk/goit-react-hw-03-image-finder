import React, { Component } from 'react';
// import { ReactComponent as CloseIcon } from '../Icons/close.svg';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import ImageChanger from './ImageChanger/ImageChanger';

class App extends Component {
  state = {
    isImageLoaded: false,
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ isImageLoaded: false });
    }
  }

  render() {
    const { isImageLoaded } = this.state;
    const { url } = this.props;
    const showLoader = url && !isImageLoaded;
    const { showModal } = this.state;
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
          {/* {showLoader && <h2>Loading Images</h2>} */}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <Button onClick={this.toggleModal}>
                {/* <CloseIcon width="30" height="30" fill="red" /> */}
              </Button>
              <ImageChanger />
              {/* <ImageChanger items={img} /> */}
              Lorem ipsum dolor sit amet.
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
