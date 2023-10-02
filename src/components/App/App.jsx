import React, { Component } from 'react';
import { fetchImages } from 'api';
import Button from 'components/Buton/Button';
import { Searchbar } from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader';
import { AppStyled } from './App.styled';

export class App extends Component {
  state = {
    photos: [],
    showModal: false,
    largeImageUrl: '',
    isLoading: false,
    searchQuery: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, photos: [] });
  };

  openModal = imageSrc => {
    this.setState({ showModal: true, selectedImage: imageSrc });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSearch = async searchQuery => {
    const photos = await fetchImages(searchQuery);
    this.setState({ photos: photos, searchQuery });
  };

  handleImageClick = (largeImageUrl) => {
    this.setState({ largeImageUrl, showModal: true });
  };

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then(photos => {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
        }));
      })
      .catch(error => {
        console.log('Error fetching images:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    // window.scrollTo({
    //   top: page,
    //   behavior: "smooth",
    // })
  };

  render() {
    const { showModal, isLoading, photos, largeImageUrl } = this.state;

    return (
      <AppStyled>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        <ImageGallery
          photos={photos}
          onPhotoClick={this.handleImageClick}
          searchQuery={this.state.searchQuery}
        />
        {isLoading && <Loader />}
        {!!photos.length && !isLoading &&   <Button onClick={this.handleClickLoadMore} />}
        {showModal && (
          <Modal
            largeImageUrl={largeImageUrl}
            alt="Large Image"
            onClose={this.closeModal} 
          />
        )}
      </AppStyled>
    );
  }
}
