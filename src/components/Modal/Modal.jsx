import {useEffect} from 'react';
import { Overlay, Modals } from './Modal.styled';

export default function Modal({largeImageUrl,alt,closeModal}) {
  console.log(largeImageUrl,alt,closeModal);
  useEffect(() => {

    const handleKeyDown = (e) => {
      console.log(largeImageUrl,alt,closeModal);
      if (e.code === 'Escape') {
        closeModal();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, largeImageUrl,alt]);



  const handleBackdropClick = (e) => {
    console.log(largeImageUrl,alt,closeModal);
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <Modals>
        <img src={largeImageUrl} alt={alt} />
      </Modals>
    </Overlay>
  );
}

