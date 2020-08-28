module.exports = {
  states: {
    title: 'States',
    intro:
      'Many photographs are associated with the location that they originated from. Select a state name to see a list of photographs organized by state.',
    help: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
    mapDirections: 'Select a state from the map or list below to see photograghs organized by state.',
    selectPrompt: 'Select a State',
    disclaimer:
      'The state map and list below are organized loosely by BIA regional office jurisdictions for readability. In reality, Eastern Oklahoma Region, Navajo Region, the border between the Northwestern and Rocky Mountain regions as well as many other other jurisdictional borders do not correspond U.S. state borders.',
  },
  topics: {
    title: 'Topics',
    intro:
      'Photographs are organized around common topics to help you discover digitized photos in this record group. Topics range from photos related to BIA history to Native American culture.',
    help: 'This is content for the intro help popover.',
    selectPrompt: 'Select a Topic',
  },
  tribalNations: {
    help: 'This is content for the intro help popover.',
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
        intro:
          'Therefore, some tribes, topics, and geographic areas may not be fully represented. As NARA digitizes and makes more photographs publicly accessible, they will be made available through this project. ',
        introIcon: 'warning',
        superTitle: 'Our records are still incomplete',
        title:
          'This is a living project that will continue to grow and evolve as NARA digitizes more photographs from the BIA records.',
      },
      {
        imageUrl: `${process.env.PUBLIC_URL}/images/content/records_digitized.png`,
        intro:
          'Therefore, some tribes, topics, and geographic areas may not be fully represented. As NARA digitizes and makes more photographs publicly accessible, they will be made available through this project. ',
        superTitle: 'Our records are still incomplete',
        title:
          'This is a living project that will continue to grow and evolve as NARA digitizes more photographs from the BIA records.',
      },
      {
        imageUrl: `${process.env.PUBLIC_URL}/images/content/corner.png`,
        intro:
          'Some of the terms used at the time may now be considered to be outdated, inaccurate, derogatory, disrespectful, or culturally insensitive. NARA does not alter, edit, or modify original captions as they are part of the historical record, which often reflect and document the attitudes and biases of government officials at the time.',
        superTitle: 'Our records reflect a settler-colonialist history',
        title:
          'Captions for and the terms used to describe the photographs in NARA’s holdings were created at or about the time each image was created.',
      },
    ],
  },
};
