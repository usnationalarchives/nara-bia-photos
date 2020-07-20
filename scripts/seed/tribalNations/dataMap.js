const trim = require("lodash").trim;

module.exports = {
  naId: (result) => {
    return result.naId;
  },

  name: (result) => {
    return trim(
      result.authority.organization.organizationNameArray.organizationName.name
    );
  },
};
