# Comics Original Art Gallery

A simple React app that I built to feature my OA collection.

## Running Demo

[This is a gallery featuring my OA pieces: published pages, sketches, and blank cover sketches](https://hdcomics.netlify.app)

## Usage

- Place images in `public/photos` - you may add subfolders
- Edit `photos.json` file:
    - The top level will contain the folders. Each folder will have:
        - `name`: the name shown in the dropdown
        - `folder`: actual folder name - try to keep it one word
        - `files`: an array of files
    - Each file entry in the array, should have the following properties:
        - `src` - full name of the file in its folder
        - `title` - the name and title shown for teh image in the gallery
        - `artist` - name of the artist/s
        - `width` and `height` are relative sizes for the image in the gallery. Use the following hints:
            - portrait: height > width
            - landscape: width > height
            - square: height == width
- Build and deploy (I use Netlify, but it can be deployed to Github, or any other static hosting, or run locally)

## Components Used

- [React Photo Gallery](https://github.com/neptunian/react-photo-gallery) - for the gallery
- [React Images](https://github.com/jossmac/react-images) - for the carousel
- [React Player](https://github.com/cookpete/react-player) - to play Youtube videos
- [Fork-Me-On-Github](https://github.com/whatthefoo/fork-me-on-github) - for Octocat icon
- [rc-switch](https://github.com/react-component/switch) - for the dark/light mode switch

## Comment on Peer Dependencies

Due to some of the older components used here incompatibility with newer versions of React, running `npm install` 
may result in an `ERESOLVE` error, with tons of `peer dependencies` messages.

To avoid that, run `npm install --legacy-peer-deps` when running locally.  
When using Netlify etc., add an environment variable called `NPM_FLAGS` with the value `--legacy-peer-deps`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
