const trim = require('lodash').trim;
const parameterize = require('../helpers').parameterize;

module.exports = {
  naId: result => {
    return result.naId;
  },

  name: result => {
    return trim(result.authority.organization.organizationNameArray.organizationName.name);
  },

  slug: result => {
    const name = result.authority.organization.organizationNameArray.organizationName.name;
    let slugPart = parameterize(name);
    return `${slugPart}-${result.naId}`;
  },

  variantNames: result => {
    const variantNames = result.authority.organization.organizationNameArray.organizationName.variantNameArray;

    if (Array.isArray(variantNames)) {
      return variantNames.map(name => name.variantOrganizationName.name).join('||');
    } else if (variantNames) {
      return variantNames.variantOrganizationName.name;
    } else {
      return null;
    }
  },
};
