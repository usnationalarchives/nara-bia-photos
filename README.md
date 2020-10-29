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
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run seed`

Programattically generates the data files used to popluate the record and Tribal Nation content in the site. The files are written to the `src/data` directory and should **not** be manually modified. The files will be overwritten each time the `seed` task is run.
