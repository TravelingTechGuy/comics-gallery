import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
// import ReactPlayer from './ResponsiveYoutubePlayer';
import ReactPlayer from 'react-player/youtube';

import photos from './photos.json';
import './App.css';

const photosFolder = '/photos/covers';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const title = img => `${img.title} by ${img.artist}`;
    let imgs = photos.map(img => ({
      ...img,
      src: `${photosFolder}/${img.src}`,
      caption: title(img),
      alt: title(img),
    }));
    setImages(imgs);
  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setViewerIsOpen(true);
    if(images[index].video) {
      setVideo(images[index].video);
    }
    else {
      setCurrentImage(index);
    }
  }, [images]);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
    setVideo(null);
  };

  return (
    <div>
      <h1>Hand Drawn Comics Covers</h1>
      <Gallery photos={images} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ?
          <Modal onClose={closeLightbox}>
            {video ?
              <ReactPlayer url={video} />
              :
              <Carousel
                currentIndex={currentImage}
                views={images}
                trackProps={{
                  onViewChange: n => {
                    if(images[n].video) {
                      console.log('skipping', this, n);
                      // setCurrentImage(currentImage + 1);
                    }
                  }
                }}
              />
            }
            </Modal>
          :
          null
        }
      </ModalGateway>
    </div>
  );
}

export default App;
