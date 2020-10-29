# Nation Archives Bureau of Indian Affairs Photography Finding Aid

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

## Noteworthy JavaScript Libraries

The core of this application leverages the [React](https://reactjs.org) JavaScript framework. For more information on React, please refer to their [project documentation](https://reactjs.org/docs/getting-started.html)

While this is an entirely client-side application that runs in the browser, it is able to provide complex features such as full text and faceted search which traditionally require server-side support. This functionality is made possible by the use of two libaries listed below. Please view these project pages to learn more about how these work and are used to support the features within the BIA finding aid.

- [ElasticLunr](http://elasticlunr.com/)
- [Crossfilter](http://crossfilter.github.io/crossfilter/)
