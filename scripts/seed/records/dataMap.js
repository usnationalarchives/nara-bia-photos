const trim = require('lodash').trim;
const parameterize = require('../helpers').parameterize;

const topics = [
  { name: 'Agriculture', slug: 'agriculture', thumbnailNaId: 170102075, variantNames: [] },
  { name: 'Animals', slug: 'animals', thumbnailNaId: 12079826, variantNames: ['animal'] },
  {
    name: 'Art and Artifacts',
    slug: 'art-artifacts',
    thumbnailNaId: 519161,
    variantNames: ['art and artifact', 'art and artifacts'],
  },
  { name: 'Buildings', slug: 'buildings', thumbnailNaId: 12084828, variantNames: ['building', 'buildings'] },
  { name: 'Bureau of Indian Affairs Personnel', slug: 'bia-personnel', thumbnailNaId: 292868, variantNames: [] },
  { name: 'Camps', slug: 'camps', thumbnailNaId: 285803, variantNames: ['camp', 'camps'] },
  { name: 'Children', slug: 'children', thumbnailNaId: 12460729, variantNames: ['children'] },
  { name: 'Clothing', slug: 'clothing', thumbnailNaId: 298648, variantNames: ['clothing'] },
  { name: 'Communities', slug: 'communities', thumbnailNaId: 519145, variantNames: ['communities'] },
  { name: 'Construction', slug: 'construction', thumbnailNaId: 118969535, variantNames: ['construction'] },
  { name: 'Councils', slug: 'councils', thumbnailNaId: 298702, variantNames: ['councils'] },
  { name: 'Dances', slug: 'dances', thumbnailNaId: 12466498, variantNames: ['dance', 'dances'] },
  { name: 'Events', slug: 'events', thumbnailNaId: 285197, variantNames: ['event', 'events'] },
  { name: 'Fishing', slug: 'fishing', thumbnailNaId: 285703, variantNames: ['fishing'] },
  { name: 'Food Preparation', slug: 'food-preparation', thumbnailNaId: 519166, variantNames: ['food preparation'] },
  { name: 'Groups', slug: 'groups', thumbnailNaId: 595392, variantNames: ['group', 'groups'] },
  { name: 'Dwellings', slug: 'dwellings', thumbnailNaId: 7867735, variantNames: ['dwelling', 'dwellings'] },
  { name: 'Hunting', slug: 'hunting', thumbnailNaId: 285719, variantNames: ['hunting'] },
  { name: 'Portraits', slug: 'portraits', thumbnailNaId: 285690, variantNames: ['portrait', 'portraits'] },
  { name: 'Recreation', slug: 'recreation', thumbnailNaId: 158884346, variantNames: ['recreation'] },
  {
    name: 'Reservations',
    slug: 'reservations',
    thumbnailNaId: 292867,
    variantNames: ['reservations', 'reservation', 'Reservation'],
  },
  { name: 'Manufacturing', slug: 'manufacturing', thumbnailNaId: 523806, variantNames: ['manufacturing'] },
  { name: 'Landscapes', slug: 'landscapes', thumbnailNaId: 170102383, variantNames: ['landscapes', 'landscape'] },
  { name: 'Leaders', slug: 'leaders', thumbnailNaId: 32202303, variantNames: ['leaders', 'leader'] },
  { name: 'Military Service', slug: 'military-service', thumbnailNaId: 285695, variantNames: ['military service'] },
  { name: 'Music', slug: 'music', thumbnailNaId: 5585778, variantNames: ['music'] },
  { name: 'Schools', slug: 'schools', thumbnailNaId: 295152, variantNames: ['schools', 'school'] },
  { name: 'Transportation', slug: 'transportation', thumbnailNaId: 118972577, variantNames: ['transportation'] },
];

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
    const file = object => {
      let json = {};
      if (Array.isArray(object.file)) {
        json.url = object.file[0]['@url'];
        json.path = object.file[0]['@path'];
      } else if (object.file) {
        json.url = object.file['@url'];
        json.path = object.file['@path'];
      }
      return json;
    };

    const mapObject = object => {
      let json = {
        type: (object.technicalMetadata || {})['mime'],
        thumbnail: {
          url: object.thumbnail['@url'],
        },
        file: file(object),
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

    // Normalize topic names using variant names
    const normalizeName = name => {
      const displayNames = topics.map(topic => topic.name);
      if (displayNames.includes(name)) {
        return name;
      }

      for (const topic of topics) {
        if (topic.variantNames.includes(name)) {
          return topic.name;
        }
      }

      return name;
    };

    if (Array.isArray(tags)) {
      return tags.map(tag => normalizeName(tag.$)).join('||');
    } else if (tags) {
      return [normalizeName(tags.$)];
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
