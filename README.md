This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

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

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---

1. The design choice need to be the same. If there would by different UI chunks everywhere it may be unnapealing as a result.
2. Do not attempt to integrate GUI into another project, it's recommended to start over especially when the project is very different.
3. Avoid writing long messy codes in the components, re-use code and where it's necessary by installing react add-ons instead.
4. Avoid repetitive code. It's a time waste for everyone.
5. Do not attempt to code components you wouldn't use in the future, only code components which are essential for your application.
6. Do not modify the code that already works well and it's simplified enough to make sense and the only way to make it better is to rewrite it. Expand upon it instead.
7. Every class chould provide one functionality, not multiple.
8. Make clean code or at least attempt to.
9. It's highly recommended to test your code while you write it becouse if there is a mistake it will be very difficult to find.
10. It's recommended to reduce dependencies on the components as well as variables. Make multiple for each because it may be a problem as the project progresses.
11. Create event handlers so your app doesn't crash, create a message instead what telling programmer what exactly goes wrong.
12. Learn more tools, learn more addons, go on the internet and explore, there could be a lot of handy things.
13. Do not make your code disordered and it may contain bugs because of syntaxis. Learn to maintain a structure
14. Do not guess by programming, reasearch and understand what you're writing. It will help you to avoid not knowing why it doesn't work.
15. Try to encapsulute the code that potentially might change in the future.
