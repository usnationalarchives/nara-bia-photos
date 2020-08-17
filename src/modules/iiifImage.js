const iiifImage = (record, width = 'full') => {
  const baseUrl = 'https://catalog.image.drupalme.net/iiif/2';

  // encode the path and remove the possible leading slash
  let path = JSON.parse(record.objects)[0].file.path;
  path = path[0] === '/' ? path.substring(1) : path;
  const encodedPath = encodeURIComponent(path);

  // create the image server URL
  const imageUrl = `${baseUrl}/${encodedPath}/full/${width === 'full' ? 'full' : `${width},`}/0/default.jpg`;

  return imageUrl;
};

export default iiifImage;
