import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import photos from './photos.json';
import './App.css';

const photosFolder = '/photos/covers';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    const title = img => `${img.title} by ${img.artist}`;
    let images = photos.map(img => ({
      ...img,
      src: `${photosFolder}/${img.src}`,
      caption: title(img),
      alt: title(img),
    }));
    setImages(images);
  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <h1>Hand Drawn Comics Covers</h1>
      <Gallery photos={images} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default App;
