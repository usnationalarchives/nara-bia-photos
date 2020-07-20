const axios = require("axios");

const config = {
  endpoint: "https://catalog.archives.gov/api/v1",
  params: {
    type: "organization",
    "publicContributions.tags": '"Native American Tribe"',
    rows: 5000,
  },
};

module.exports = {
  fetchAll: async () => {
    let response;

    try {
      response = await axios.get(config.endpoint, {
        params: config.params,
      });
    } catch (error) {
      return error;
    }

    return response;
  },
};
