import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import ReactPlayer from 'react-player/youtube';

import photos from './photos.json';
import './App.css';

const PHOTOS_FOLDER = '/photos';
const COLLECTIONS = {
  Covers: 'Covers',
  OriginalArt: 'Original Art',
  PublishedArt: 'Published Art'
};

function App() {
  const [collection, setCollection] = useState('Covers');
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const title = img => `${img.title} by ${img.artist}`;
    let imgs = photos[collection].map(img => ({
      ...img,
      src: `${PHOTOS_FOLDER}/${collection}/${img.src}`,
      caption: title(img),
      alt: title(img),
    }));
    setImages(imgs);
  }, [collection]);

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
      <h1>{COLLECTIONS[collection]} Collection</h1>
      <div className="list-container">
        <select className="select-css" defaultValue={collection} onChange={e => setCollection(e.target.value)}>
        {
          Object.keys(COLLECTIONS).map(c => <option value={c} key={c}>{COLLECTIONS[c]}</option>)
        }
        </select>
      </div>
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
