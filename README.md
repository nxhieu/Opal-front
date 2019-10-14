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

1. Redux and Redux thunk.

With the use of redux and redux-thunk, the workflow for our project would be as follow: Component => Action => Reducer => Component

![react-redux work flow](https://my-blog-1996.s3-ap-southeast-2.amazonaws.com/readme/redux-flow.png)

We take advantage of redux-thunk to pass in middleware. Our action creators will return a function with dispatch as a parameter instead of a direct action. A typical action creator for this project would be : export const register = () => async dispatch => { }

Reducer file will contain initialState and reducer function that dispatches the state to Redux store.

Inside reducer.js, reducer function will take advantage of switch function to avoid repeating code and improve code readability.

All reducers will be separated in term of features (e.g. authReducer.js, postReducer.js, commentReducer.js)

All reducers from different features will be pooled using combineReducers({ })

Or component will be managed by react-router-dom switch function. All private component cant only accessed if authenticated <Route exact path = “/post” render = { () => ! authenticated ? () : () }

For every AJAX calls to rest API, we implement by using fetch function instead or more convenient function like AXIOS from axios library in order to learn about HTTP.
Back-end

Our react app follows Model View Controller pattern. It may slow down our development speed but it will pay off in the future if we need to scale our application.

Route will be put in a separate file and get imported in app.js to register. Inside route.js file, the middleware will be pooled using express.Router(). This is done to avoid putting too much code in our app.js.

In every function, we have to implement error handling.

The controller will get the data from front-end using body-parser to put data to req.data, save the data to the mongo altas or get the data from the mongo

All private route is protected by is-Auth middleware that checks whether a user has a valid webtoken to gain access to the route.

app.js use the middleware to make show all the routes will be connected

The models defines the collection by using the mongoose library
