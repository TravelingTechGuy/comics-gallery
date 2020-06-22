# Hand-Drawn Comics Gallery

## Running Demo

[Demo of the app showing my collection of hand drawn comic book covers](https://hdcomics.netlify.app)

A simple react app that shows a gallery of comic book covers, and uses Lightbox to focus on each.

## Usage

- Place photos in `public/photos - you may add subfolders.
- Change `photos.json` to include each photo's name, description, and whether it's:
    - portrait: height > width
    - landscape: width > height
    - square - height == width
- Build and deploy (I use Netlify, but it can be deployed to Github, or any other static hosting, or run locally)

## Components Used

- [React Photo Gallery](https://github.com/neptunian/react-photo-gallery) - for the gallery
- [React Images](https://github.com/jossmac/react-images) - for the carousel

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
