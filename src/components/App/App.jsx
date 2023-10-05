import React, { useState, useEffect } from 'react';
import { fetchImages } from 'api';
import Button from 'components/Buton/Button';
import { Searchbar } from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader';
import { AppStyled } from './App.styled';

export default function App() {

  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      fetchImages(searchQuery, page)
        .then(newPhotos => {
          setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        })
        .catch(error => {
          console.log('Error fetching images:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchQuery, page]);

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPhotos([]);
  };

  const closeModal = ()=> {
    setShowModal(false);
  };

  const handleClickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (largeImageUrl) => {
    setLargeImageUrl(largeImageUrl);
    setShowModal(true);
  };

  return (
    <AppStyled>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      <ImageGallery
        photos={photos}
        onPhotoClick={handleImageClick}
        searchQuery={searchQuery}
      />
      {isLoading && <Loader />}
      {!!photos.length && !isLoading && <Button onClick={handleClickLoadMore} />}
      {showModal && (
        <Modal
          largeImageUrl={largeImageUrl}
          alt="Large Image"
          closeModal={closeModal}
        />
      )}
    </AppStyled>
  );
}