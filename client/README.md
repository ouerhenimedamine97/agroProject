This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Install instructions
requirements : 
-Node.js
-Metamask (You must use google chrome browser)
-truffle
-ganache
## How to run
before running the application :  

-clone this repo 
-open terminel
-cd into the client folder
-Install the project dependencies : 
npm install  
(or yarn )
After installing required packages : 
-open ganache application
-create a new workspace
-click add project and select truffle-config.js file
-import accounts to metamask
-open new terminal window (cd into the cloned project folder)
-run the following commands : 
    truffle compile
    truffle migrate
    truffle develop
    migrate --reset
-open to the client folder
-open new terminal window
-run the following command : 
    npm start
## Usages

step 1 : go to farmer space and enter product details and leave the farmer space 
step 2 :  go to quality testing space, you can check exiting product details using existing product id, after that click on approuve details button and enter details (you must enter existing product id) for creating a new lot and leave quality tesing space
step 3 : go to supplier space, you can verify the lot and product details using an existing lot number, after that click on provide a lot button and enter details (you must enter an existing lot number) to provide a lot and leave the supplier space
step 4 : go to customer space, enter lot number (used in supplier space for providing a lot)  and you will get a QR Code, scanne it with you smartphone and you will get provided lot details.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
