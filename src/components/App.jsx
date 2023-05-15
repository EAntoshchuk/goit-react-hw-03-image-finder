import React, { Component } from 'react';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <div
          style={{
            height: '10vh',
            // display: 'flex',
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
          {showModal && (
            <Modal onClose={this.toggleModal}>
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
