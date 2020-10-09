const trim = require('lodash').trim;
const parameterize = require('../helpers').parameterize;

module.exports = {
  naId: result => {
    return result.naId;
  },

  title: result => {
    return trim(result.description.item.title);
  },

  scopeContentNote: result => {
    return trim(result.description.item.scopeAndContentNote);
  },

  date: result => {
    const dateArray = result.description.item.productionDateArray;
    let year;

    if (dateArray && Array.isArray(dateArray)) {
      year = dateArray[0].proposableQualifiableDate.year;
    } else if (dateArray) {
      year = dateArray.proposableQualifiableDate.year;
    }

    return year;
  },

  slug: result => {
    const title = result.description.item.title;
    let slugPart = parameterize(title);
    return `${slugPart}-${result.naId}`;
  },

  parentSeriesNaId: result => {
    return (result.description.item.parentSeries || result.description.item.parentFileUnit.parentSeries).naId;
  },

  parentSeriesTitle: result => {
    return (result.description.item.parentSeries || result.description.item.parentFileUnit.parentSeries).title;
  },

  objects: result => {
    const mapObject = object => {
      let json = {
        type: (object.technicalMetadata || {})['mime'],
        thumbnail: {
          url: object.thumbnail['@url'],
        },
        file: {
          url: object.file['@url'],
          path: object.file['@path'],
        },
      };

      let width = (object.technicalMetadata || {}).width;
      let height = (object.technicalMetadata || {}).height;

      if (width && height) {
        json.aspectRatio = parseInt(width) / parseInt(height);
      }

      if (object.imageTiles) {
        json.imageTiles = {};
        json.imageTiles.url = object.imageTiles['@url'];
      }

      return json;
    };

    const objects = result.objects.object;

    if (objects && Array.isArray(objects)) {
      data = objects.map(object => mapObject(object));
    } else if (objects) {
      data = [mapObject(objects)];
    }

    return JSON.stringify(data);
  },

  aspectRatio: result => {
    const object = result.objects.object;
    let width, height;

    if (object && Array.isArray(object)) {
      const filteredObjects = object.filter(obj => obj.technicalMetadata);
      width = (filteredObjects[0] || {}).width;
      height = (filteredObjects[0] || {}).height;
    } else if (object) {
      width = (object.technicalMetadata || {}).width;
      height = (object.technicalMetadata || {}).height;
    }

    if (object && width && height) {
      width = width.replace('pixels', '').trim();
      height = height.replace('pixels', '').trim();

      return parseInt(width) / parseInt(height);
    } else {
      return 0;
    }
  },

  tags: result => {
    const tags = ((result.publicContributions || {}).tags || {}).tag;

    if (Array.isArray(tags)) {
      return tags.map(tag => tag.$).join('||');
    } else if (tags) {
      return [tags.$];
    } else {
      return null;
    }
  },

  tribes: result => {
    const tribes = (result.description.item.organizationalReferenceArray || {}).organizationName;

    if (Array.isArray(tribes)) {
      return tribes.map(tribe => tribe.termName).join('||');
    } else if (tribes) {
      return tribes.termName;
    } else {
      return null;
    }
  },

  states: result => {
    const geoReferences = (result.description.item.geographicReferenceArray || {}).geographicPlaceName;

    if (Array.isArray(geoReferences)) {
      return geoReferences.map(geoReference => geoReference.termName).join('||');
    } else if (geoReferences) {
      return geoReferences.termName;
    } else {
      return null;
    }
  },
};
