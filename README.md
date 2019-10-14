HEADPAGE DOCUMENTATION: (Advanced Internet Programming Spring 2019)

team member:
Nguyen Xuan Hieu : 12803577
Yi-An, Chen (Anita) : 13067475
Michelle Yong : 13333695

    This projects were seperated into 2 github repositories:
    Front-end (View part) : https://github.com/nxhieu/headpage-front
    Rest api (Model Controller): https://github.com/nxhieu/headpage-rest

The details of A3 project is as follow:

I. Front-end.

1. Redux and Redux thunk usage.

With the use of redux and redux-thunk, the workflow for our project would be as follow:

![react-redux work flow](https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/readme/redux-flow.png)

We take advantage of redux-thunk to pass in middleware. Our action creators will return a function with dispatch as a parameter instead of a direct action. A typical action creator for this project would be : export const register = () => async dispatch => { };

2. Front end file structure with redux.

![react-redux work flow](https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/readme/Filfe+structure+Diagram.png)

Actions folder: contains all action files.

    - These action files will mainly contains async function (mainly api calls)
    - All action files are seperated in term of features (e.g: authAction, postAction, commentAction)

Reducer folder: contains all reducer files related to each feature.

    - All reducer functions were combined in index.js file using combineReducer from redux library.
    - All reducer files are seperated in term of features (e.g: authReducer, postReducer, commentReducer)

Dist folder: contains all styling files (css)

img folder: contains all image used.

Component folder: contains all react component files for the app.

3. Front end features
