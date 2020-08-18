import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import ReactPlayer from 'react-player/youtube';
import {ThemeSwitch, getBrowserTheme} from './Theme';

import photos from './photos.json';
import './App.css';

const PHOTOS_FOLDER = '/photos';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(getBrowserTheme());
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const title = img => `${img.title} by ${img.artist}`;
    let imgs = photos[collectionIndex].files.map(img => ({
      ...img,
      src: `${PHOTOS_FOLDER}/${photos[collectionIndex].folder}/${img.src}`,
      caption: title(img),
      alt: title(img),
    }));
    setImages(imgs);
  }, [collectionIndex]);

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
    <div className={`App ${isDarkTheme ? 'dark' : 'light'}Theme`}>
      <ThemeSwitch
        onChange={() => setIsDarkTheme(!isDarkTheme)}
        defaultChecked={isDarkTheme}
      />
      <header className="App-header">
        <img src="favicon/favicon.ico" alt="icon" style={{float: "inline-start"}} />&nbsp;
        {photos[collectionIndex].name} Collection
      </header>
      <main className="App-body">
        <div className="list-container">
          <select className="select-css" defaultValue={collectionIndex} onChange={e => setCollectionIndex(e.target.value)}>
          {
            photos.map((p, i) => <option value={i} key={p.folder}>{p.name}</option>)
          }
          </select>
        </div>
        <Gallery photos={images} margin={8} onClick={openLightbox} />
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
      </main>
      <footer className="App-footer">
        MyGallery&trade; All rights &copy; {(new Date()).getFullYear()}
      </footer>
    </div>
  );
}

export default App;
