# National Archives Bureau of Indian Affairs Photographs Finding Aid

## Outline

- [Local Development](#local-development)
  - [Dependencies](#dependencies)
  - [Setup](#setup)
  - [Starting the Application](#starting-the-application)
- [Available Scripts](#available-scripts)
- [AWS Environment](#aws-environment)
  - [Deployment](#deployment)
  - [Data Synchronization](#data-synchronization)
- [Application Data](#application-data)
  - [Search Filters](#search-filters)
- [Content Management](#content-management)
- [Text Content](#text-content)
- [Homepage](#homepage)
- [Landing Pages](#landing-pages)
- [Listing Pages](#listing-pages)
- [Noteworthy JavaScript Libraries](#noteworthy-java-script-libraries)

## Local Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Refer to the CRA documenation for more details.

### Dependencies

- [NodeJS](https://nodejs.org/en/)  
  Note: We recommend [asdf](https://github.com/asdf-vm/asdf) for managing multiple versions of Node
- Yarn
  ([Windows](https://yarnpkg.com/en/docs/install#windows-stable), [macOS](https://yarnpkg.com/en/docs/install#mac-stable))

### Setup

Use Yarn to install the JS dependencies required to boot and build the application

```
yarn install
```

### Starting the Application

```
yarn start
```

see [yarn start script](#yarn-start) for more details

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/research/native-americans/bia/photos](http://localhost:3000/research/native-americans/bia/photos) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run seed`

Programattically generates the data files used to popluate the record and Tribal Nation content in the site. The files are written to a folder up one level from the project directory called `data` (`../data` relative to this directory). You might need to create this folder manually if it does not already exist. The files will be overwritten each time the `yarn seed` task is performed.

### `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

NOTE: The build script can only be performed after the dataset has been seeded with the `yarn seed` script.

## AWS Environment

This application is hosted on an AWS EC2 instance provisioned by NARA (bia.test.drupalme.net) and is available publicly at [https://bia.test.drupalme.net/research/native-americans/bia/photos/](https://bia.test.drupalme.net/research/native-americans/bia/photos/).

### Deployment

The deployment script is owned by the account on the above server created by NARA for use by Threespot (dboggs). In order to deploy updates to this environment you must have an appropriate SSH public key added to this account's `~/.ssh/authorized_keys` file. Once this is configured a collaborator may deploy the application by running:

```
ssh dboggs@34.197.152.218 -p 122 './sites/bia/deploy.sh'
```

This script will pull the latest code down from the `master` branch on GitHub, install any missing dependencies, build the applicatoin, and promotes the production build to the web server directory at `/appdata/www/bia.archives/website/public/research/native-americans/bia/photos` using `rsync`.

### Data Synchronization

There is a script owned by the same user acount that handles deployments (dboggs) that automates the process of fetching new data from the catalog (using the aforementioned `yarn seed` script), buiding the project, and deploying the site. If a collaborator has their SSH key deployed to the server this can be manually executed by running:

```
ssh dboggs@34.197.152.218 -p 122 './sites/bia/sync_data.sh'
```

Note that this process can take 15 minutes or more to complete. This script is also executed on Monday nights at midnight (Tuesday 00:00:00 AM), via a cron job owned by the `dboggs` user on the server.

## Application Data

The data used to populate the application is generated programmatically. The data files are created by a yarn script (`yarn seed`) and are persisted to a folder adjacent to the project folder called “data”. These data files are not included in the code repository and only exist in your local environment after running the “`yarn seed`” script. Record/photograph data is collected in the records.json file. This file contains all the information required for referencing individual records and populating information categorized by states, topics, and tribal nations. The `tribalNations.csv` file includes all the Tribal Nations related to the records that are pulled from the catalog. There are constants defined which dictate how content is categorized and filtered within the experience. These constants exist in the `/src/modules/constants.js` file.

## Search Filters

The search filters are limited by the constants defined. For example, only topics that are included in the topics array will be filterable within the search experience. If records are tagged with a new topic in the catalog, and that topic should be filtered within this site, the topic will need to be added to the constants array. This is also true for state filters. Tribal Nations are defined when the application data is seeded and the application is updated after a new build.

## Content Management

There are two main files for managing text content and values related to the homepage, landing pages, listing pages, and the about page within the site. There are two files: `/src/config/content.js`,which contains text strings separated by page type; `/src/modules/constants.js`, which defines values related to topics, states, and regions.

### Text Content

The `/src/config/content.js` file contains text strings grouped by page type. For example, text related to the homepage exists within the `home` key in the JSON object. Not all text strings have been abstracted to this file and will exist in the code of the specific React component. Several strings contain a section that will be interpolated dynamically on the front-end. For example, `${STATE}` will be replaced with the current page's state name.

### Homepage

Text content for the three promotions are located in the `/src/config/content.js` within the home property. The NAIDs used to select which images appear in the grid are defined in the `/src/modules/constants.js` file in the `homepageGridThumbnailNaids` array variable. The order does not matter since they are randomized on each page load.

#### Explore Tribal Nation Modal

The content of the Explore Tribal Nation modal is dynamically generated based on the data imported from the catalog. The 10 Tribal Nations with the most photographs associated with them will be selectable to the user. The visualization is generated based on the tags associated with the Tribal Nation’s photographs.

#### Explore Photographs of Notable Native Americans Modal

NAIDs of the photographs highlighted in the Notable Native Americans modal are defined in the `/src/modules/constants.js` file within the notableNativeAmericansNaids array variable.

### Landing Pages

The title, introduction text, and banner image for each landing page is managed in the `/src/config/content.js` in their respective key. Billboard images should exist in the `public/images/banners` directory. Each banner requires a standard and high resolution image. Curated images are defined in their record NAID and are assigned in the `/src/modules/constants.js` file.

#### Tribal Nations Landing Page

Curated images for each alphabetical grouping are defined in the `/src/modules/constants.js` file within the tribalNationThumbnails variable.

#### States Landing Page

Curated images for each state are defined in the `/src/modules/constants.js` file within the states variable array. The photograph NAID is defined as the thumbnailNaId value for each state object within the states array.

### Listing Pages

The title, introduction text, and banner image for each landing page is managed in the `/src/config/content.js` in their respective key.

#### Tribal Nation Listing Page

The banner on the tribal nation listing page contains an interactive map. The highlighted states are dynamically generated based on the states tagged by the Tribal Nation photographs. They do not need to be manually defined.

#### About Page

The `/src/config/content.js` file contains an about key with a billboards property which defines the text and images associated with the about page content. The rich text is managed separately as html from within the `/src/config/about.html` file.

## Noteworthy JavaScript Libraries

The core of this application leverages the [React](https://reactjs.org) JavaScript framework. For more information on React, please refer to their [project documentation](https://reactjs.org/docs/getting-started.html)

While this is an entirely client-side application that runs in the browser, it is able to provide complex features such as full text and faceted search which traditionally require server-side support. This functionality is made possible by the use of two libaries listed below. Please view these project pages to learn more about how these work and are used to support the features within the BIA finding aid.

- [ElasticLunr](http://elasticlunr.com/)
- [Crossfilter](http://crossfilter.github.io/crossfilter/)
