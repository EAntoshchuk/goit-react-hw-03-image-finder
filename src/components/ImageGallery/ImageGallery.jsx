import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery() {
  return (
    <ul className={css.imageGallery}>
      {hits.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} onClick={() => onClose(largeImageURL)} />
      ))}
    </ul>
  );
}
