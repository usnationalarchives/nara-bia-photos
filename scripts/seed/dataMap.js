const trim = require("lodash").trim;

module.exports = {
  naId: (result) => {
    return result.naId;
  },

  location: (result) => {
    return trim(result.description.item.dataControlGroup.groupCd);
  },

  title: (result) => {
    return trim(result.description.item.title);
  },

  parentSeriesNaId: (result) => {
    return result.description.item.parentSeries.naId;
  },

  parentSeriesTitle: (result) => {
    return trim(result.description.item.parentSeries.title);
  },

  creatingOrg: (result) => {
    const creatingOrganization =
      result.description.item.parentSeries.creatingOrganizationArray
        .creatingOrganization;

    if (creatingOrganization && Array.isArray(creatingOrganization)) {
      creatingOrgs = creatingOrganization.map((org) => {
        if (org.creatorType.termName === "Most Recent") {
          return org.creator.termName;
        } else {
          return "";
        }
      });

      return creatingOrgs.join("; ");
    } else if (creatingOrganization) {
      return creatingOrganization.creator.termName;
    }
  },

  thumbnailUrl: (result) => {
    // If objects is an array, take the thumbnail from the frist entry
    // otherwise it can be an object
    const object = result.objects.object;

    if (object && Array.isArray(object)) {
      return object[0].thumbnail["@url"];
    } else if (object) {
      return object.thumbnail["@url"];
    }
  },

  aspectRatio: (result) => {
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
      width = width.replace("pixels", "").trim();
      height = height.replace("pixels", "").trim();

      return parseInt(width) / parseInt(height);
    } else {
      return 0;
    }
  },

  tags: (result) => {
    const tags = ((result.publicContributions || {}).tags || {}).tag;

    if (Array.isArray(tags)) {
      return tags.map((tag) => tag.$).join("||");
    } else if (tags) {
      return [tags.$];
    } else {
      return null;
    }
  },

  tribes: (result) => {
    const tribes = result.description.item.organizationalReferenceArray;

    if (Array.isArray(tribes)) {
      return tribes.map((tribe) => tribe.organizationName.termName).join("||");
    } else if (tribes) {
      return tribes.organizationName.termName;
    } else {
      return null;
    }
  },
};
