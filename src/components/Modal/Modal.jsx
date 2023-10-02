import React, { Component } from 'react';
import { Overlay, Modals } from './Modal.styled';


class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };


  render() {
    const { largeImageUrl, alt } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <Modals>
          <img src={largeImageUrl} alt={alt} />
        </Modals>
      </Overlay>
      )
    ;
  }
}

export default Modal;
