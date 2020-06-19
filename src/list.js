const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, '..', 'public', 'photos');
let photos = [];

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    photos.push({
      src: file,
      width: 1,
      height: 2,
      caption: path.basename(file)
    });
  });
  console.log(JSON.stringify(photos, null, 2));
});
