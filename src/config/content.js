module.exports = {
  states: {
    bannerImage: `${process.env.PUBLIC_URL}/images/banners/banner-states.png`,
    bannerImage2x: `${process.env.PUBLIC_URL}/images/banners/banner-states@2x.png`,
    title: 'States',
    intro:
      'Many photographs are associated with the state in which the photograph was taken. Select a state name to see a list of photographs organized by state.',
    help:
      'States associated with photographs are based on either the known location or presumed location from the available metadata.',
    mapDirections: 'Select a state from the map or list below to see photograghs organized by state.',
    selectPrompt: 'Select a State',
    disclaimer:
      'The state map and list below are organized loosely by BIA regional office jurisdictions for readability. In reality, Eastern Oklahoma Region, Navajo Region, the border between the Northwestern and Rocky Mountain regions as well as many other other jurisdictional borders do not correspond U.S. state borders.',
  },
  state: {
    // * Interpolated string ${STATE}
    intro:
      'These photographs are associated with the state of ${STATE}. Use the filters below to narrow down this list by Tribal Nation and/or topic. Select an image to see it and get more information',
  },
  topics: {
    bannerImage: `${process.env.PUBLIC_URL}/images/banners/banner-topics.png`,
    bannerImage2x: `${process.env.PUBLIC_URL}/images/banners/banner-topics@2x.png`,
    title: 'Topics',
    intro:
      'Photographs are organized around common topics to help you discover digitized photos in this record group. Topics range from photos related to BIA history to Native American culture.',
    help: 'Topics associated with photographs were identified by citizen archivists.',
    selectPrompt: 'Select a Topic',
  },
  topic: {
    // * Interpolated string ${TOPIC}
    intro:
      'This listing displays all of the photographs in this record group identified as relating to ${TOPIC}. Use the filters below to narrow down this list by Tribal Nation and/or state.',
    portraitIntro:
      'This listing displays all of the photographs in this record group identified as portraits. Use the filters below to narrow down this list by Tribal Nation and/or state.',
  },
  tribalNations: {
    bannerImage: `${process.env.PUBLIC_URL}/images/banners/banner-tribal-nations.png`,
    bannerImage2x: `${process.env.PUBLIC_URL}/images/banners/banner-tribal-nations@2x.png`,
    title: 'Tribal Nations',
    intro: "Select the first letter of a Tribal Nation's name",
    help:
      'Tribal Nations associated with photographs are based on either the known Tribal Nation or presumed Tribal Nation from the available metadata. Names used generally follow each Tribal Nation’s preferred name, but many tribes have variant names which can be searched upon as well.',
  },
  tribalNation: {
    // * Interpolated string ${TRIBE}
    intro:
      'The photographs below represent the ${TRIBE}. Use the filters below to narrow down this list by topic and/or state. Select an image to view it larger and get more information.',
  },
  footer: {
    summary:
      'If you are having difficulty finding information on this guide related to your research, ask an expert on History Hub',
    copyright: 'The U.S. National Archives and Records Administration',
  },
  about: {
    billboards: [
      {
        imageUrl: `${process.env.PUBLIC_URL}/images/content/collage.png`,
        imageAltText: "Grid of images from NARA's holdings",
        intro:
          'NARA acknowledges that photographs included in this project may evoke painful or traumatic memories and feelings from a history of systemic oppression.',
        // introIcon: 'warning',
        superTitle: 'About the Bureau of Indian Affairs (BIA) Photograph Records',
        title:
          'This digital archival experience contains historical photographs from the Bureau of Indian Affairs (BIA).',
      },
      {
        imageUrl: `${process.env.PUBLIC_URL}/images/content/records_digitized.jpg`,
        imageAltText: 'Representation of the photograph digitization process',
        intro:
          'Therefore, some Tribal Nations, topics, and geographic areas may not be fully represented. As NARA digitizes and makes more photographs publicly accessible, they will be made available through this project. ',
        // superTitle: 'Our records are still incomplete',
        title:
          'This is a living project that will continue to grow and evolve as NARA digitizes more photographs from the BIA records',
      },
      {
        imageUrl: `${process.env.PUBLIC_URL}/images/content/corner.png`,
        imageAltText: 'Image of an original photograph caption',
        intro:
          'Some of the terms used at the time may now be considered to be outdated, inaccurate, derogatory, disrespectful, or culturally insensitive. NARA does not alter, edit, or modify original captions as they are part of the historical record, which often reflect and document the attitudes and biases of government officials at the time.',
        // superTitle: 'Our records reflect a settler-colonialist history',
        title:
          'Captions for and the terms used to describe the photographs in NARA’s holdings were created at or about the time each image was created.',
      },
    ],
  },
  home: {
    intro: {
      title: 'Explore over 18,000 Photographs from the Bureau of Indian Affairs (Record Group 75)',
      text: 'Use this finding aid to explore digitized photographs from this record group',
      cta: 'Learn more about this project',
    },
    tribalNationExplorer: {
      title: 'Explore Tribal Nations',
      text: 'Explore featured Tribal Nations and the topic areas that they cover in the BIA photograph record group.',
    },
    photographExplorer: {
      title: 'Explore Photographs of Notable Native Americans',
      text: 'Explore selected photographs of notable Native Americans throughout history.',
    },
  },
};
