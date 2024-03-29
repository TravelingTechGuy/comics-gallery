import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import ReactPlayer from 'react-player/youtube';
import ForkMeOnGithub from 'fork-me-on-github';
import {ThemeSwitch, getBrowserTheme} from './Theme';

import photos from './photos.json';
import './App.css';

const PHOTOS_FOLDER = '/photos';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(getBrowserTheme());
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [filter, setFilter] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let files = photos[collectionIndex].files;
    if(filter) {
      files = files.filter(file => file.title.toLowerCase().includes(filter.toLowerCase()) || file.artist.toLowerCase().includes(filter.toLowerCase()));
    }
    let imgs = files.map(img => {
      const title = `${img.title} by ${img.artist}`;
      return {
        ...img,
        src: `${PHOTOS_FOLDER}/${photos[collectionIndex].folder}/${img.src}`,
        caption: title,
        alt: title,
        title: title
      };
    });
    setImages(imgs);
  }, [collectionIndex, filter]);

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
        defaultChecked={!isDarkTheme}
      />
      <ForkMeOnGithub
        repo="https://github.com/TravelingTechGuy/comics-gallery"
        side="right"
        colorBackground={isDarkTheme ? 'white' : '#282c34'}
        colorOctocat={isDarkTheme ? '#282c34' : 'white'}
      />
      <header className="App-header">
        <img src="favicon/favicon.ico" alt="icon" style={{float: "inline-start"}} />&nbsp;
        {photos[collectionIndex].name} Collection
      </header>
      <main className="App-body">
        <div className="filter">
          <div >
            <select
              className="select-css"
              defaultValue={collectionIndex}
              onChange={e => setCollectionIndex(e.target.value)}
            >
            {
              photos.map((p, i) => <option value={i} key={p.folder}>{p.name}</option>)
            }
            </select>
          </div>
          <div>
            <input
              type="search" 
              placeholder="Filter by artist, character, or book"
              className="filter-text"
              value={filter} 
              onChange={e => setFilter(e.target.value)}
            />
          </div>
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
        MyGallery&trade; All rights &copy; Traveling Tech Guy LLC {(new Date()).getFullYear()}
      </footer>
    </div>
  );
}

export default App;
