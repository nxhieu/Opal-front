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
    - All dispatch types are stored in type.js file to manage

Reducer folder: contains all reducer files related to each feature.

    - All reducer functions were combined in index.js file using combineReducer from redux library.
    - All reducer files are seperated in term of features (e.g: authReducer, postReducer, commentReducer)

Dist folder: contains all styling files (css)

img folder: contains all image used.

Component folder: contains all react component files for the app.

3. Image posting Feature:

Normal workflow:

![image-with-S3](https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/readme/Images3.png)

Reference: Stephen Grider (advanced Nodejs course)

imageActions contains all front end logic related to posting, deleting, updating image. functions inside this folder only be called by other actions.

updating image involve deleting image and create new image.

All presigned url has expiry time.

I. Back-end.

1. System architecture.

![backend](https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/readme/backend.png)

    - All middleware in controllers will be pooled in routes folder using express.Router(function).
    - All error will be threw to error handling middleware with status code and error message.
    - The rest api follows MVC pattern with react app being the view part.

2. Noticable Library usage.

   - aws-sdk: connect with S3.
   - Mongoose : ORM with mongodb
   - JWT: handle authentication and protect route.
   - Bcrypt: to hash the user password.
