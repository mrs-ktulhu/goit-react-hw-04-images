import React from 'react';
import { ImagesGalleryItem, ImagesGalleryImg } from './ImagesGallery.styled';


const ImageGalleryItem = ({ imageUrl, alt, onPhotoClick, largeImageUrl}) => (
  <ImagesGalleryItem>
    <ImagesGalleryImg src={imageUrl} alt={alt} onClick={()=>onPhotoClick(largeImageUrl)} />
  </ImagesGalleryItem>
);

export default ImageGalleryItem;



