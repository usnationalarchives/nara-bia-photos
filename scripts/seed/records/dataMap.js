const trim = require('lodash').trim;
const parameterize = require('../../../src/modules/helpers').parameterize;

module.exports = {
  naId: result => {
    return result.naId;
  },

  title: result => {
    return trim(result.description.item.title);
  },

  slug: result => {
    const title = result.description.item.title;
    let slugPart = parameterize(title);
    return `${slugPart}-${result.naId}`;
  },

  parentSeriesNaId: result => {
    return result.description.item.parentSeries.naId;
  },

  parentSeriesTitle: result => {
    return trim(result.description.item.parentSeries.title);
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
      width = (object[0].technicalMetadata || {}).width;
      height = (object[0].technicalMetadata || {}).height;
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
    const tribes = result.description.item.organizationalReferenceArray;

    if (Array.isArray(tribes)) {
      return tribes.map(tribe => tribe.organizationName.termName).join('||');
    } else if (tribes) {
      return tribes.organizationName.termName;
    } else {
      return null;
    }
  },

  states: result => {
    const geoReferences = result.description.item.geographicReferenceArray;

    const terms = termName => {
      if (Array.isArray(termName)) {
        return termName.join('||');
      } else if (termName) {
        return termName;
      } else {
        return null;
      }
    };

    if (Array.isArray(geoReferences)) {
      return geoReferences.map(geoReference => terms(geoReference.geographicPlaceName.termName)).join('||');
    } else if (geoReferences) {
      return terms(geoReferences.geographicPlaceName.termName);
    } else {
      return null;
    }
  },
};
