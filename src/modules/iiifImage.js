const iiifImage = (record, maxHeightWidth) => {
  const baseUrl = 'https://catalog.image.drupalme.net/iiif/2';
  const objects = JSON.parse(record.objects);

  // Try to find objects in the /lz directory on S3 by parsing their file path (higher resolution images)
  // if one does not exist fall back to the first object in the
  const filteredObjects = objects.filter(
    object => object.file.path.substring(0, 3) === '/lz' || object.file.path.substring(0, 2) === 'lz'
  );

  let path;
  let object;
  if (filteredObjects.length > 0) {
    object = filteredObjects[0];
  } else {
    object = objects[0];
  }

  path = object.file.path;

  // remove possible leading slash from path
  path = path[0] === '/' ? path.substring(1) : path;

  let bucketMapping;

  if (path.substring(0, 16) === 'content/arcmedia') {
    bucketMapping = 'media01';
    path = path.replace('content/arcmedia/', '');
  } else if (path.substring(0, 7) === 'content') {
    bucketMapping = 'media00';
    path = path.replace('content/', '');
  } else {
    bucketMapping = 'media02';
  }

  const encodedPath = encodeURIComponent(path);

  // create the image server URL
  const imageUrl = `${baseUrl}/${bucketMapping}%2F${encodedPath}/full/!${maxHeightWidth},${maxHeightWidth}/0/default.jpg`;

  return imageUrl;
};

export default iiifImage;
