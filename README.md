1. Since we use redux (state management tool) for our front end, the workflow for our project would be as follow:
Component => Action => Reducer => Component
2.  We take advantage of redux-thunk to pass in middleware. Our action creators will return a function with dispatch as a parameter instead of a direct action. A typical action creator for this project would be : 
export const register = () => async dispatch => {
	
}
3. Reducer file will contain initialState and reducer function that dispatches the state to Redux store. 

4. Inside reducer.js, reducer function will take advantage of switch function to avoid repeating code and improve code readability. 

5. All reducers will be separated in term of features (e.g. authReducer.js, postReducer.js, commentReducer.js) 

6. All reducers from different features will be pooled using combineReducers({
}) 

7. Or component will be managed by react-router-dom switch function. All private component cant only accessed if authenticated 
<Route exact path = “/post” render = { () => ! authenticated ? (<Redirect to=”/login”>) : (<Posts>) }
	
8) For every AJAX calls to rest API, we implement by using fetch function instead or more convenient function like AXIOS from axios library in order to learn about HTTP. 

>>>Back-end

9) Our react app follows Model View Controller  pattern. It may slow down our development speed but it will pay off in the future if we need to scale our application. 

10) Route will be put in a separate file and get imported in app.js to register.  Inside route.js file, the middleware  will be pooled using express.Router().  This is done to avoid putting too much code in our app.js. 

11. In every function, we have to implement error handling. 

12. The controller will get the data from front-end using body-parser to put data to req.data, save the data to the mongo altas or get the data from the mongo

13. All private route is protected by is-Auth middleware that checks whether a user has a valid webtoken to gain access to the route.   

14. app.js use the middleware to make show all the routes will be connected

15. The models defines the collection by using the mongoose library

