module.exports = {
  creatingOrg: (creatingOrganization) => {
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

  thumbnailUrl: (object) => {
    // If objects is an array, take the thumbnail from the frist entry
    // otherwise it can be an object

    if (object && Array.isArray(object)) {
      return object[0].thumbnail["@url"];
    } else if (object) {
      return object.thumbnail["@url"];
    }
  },
};
