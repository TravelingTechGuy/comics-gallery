import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import photos from './photos.json';

const photosFolder = '/photos';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    let images = photos.map(img => ({
      ...img,
      src: `${photosFolder}/small/${img.src}`,
      caption: img.title,
      alt: img.title,
      source: {
        regular: `${photosFolder}/small/${img.src}`,
        thumbnail: `${photosFolder}/small/${img.src}`,
        download: `${photosFolder}/big/${img.src}`,
        fullscreen: `${photosFolder}/medium/${img.src}`,
      }
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
