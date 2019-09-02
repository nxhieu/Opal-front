This project is the front end system for a social media project . 
Here you could find the some of the code styles and patterns that were adopted: 
<<<<<<<<<<<<<<<<<<<FRONT-END
1/ The project using redux for state management. Thus the code flow and style is as follow: 
Component = > Action => Reducer => Component. Thats is how the workflow is for our a react- redux project
2/ Any action creators in action files, initial state and reducers will be grouped in term of feature. Thus our project could be modularised enough for 4 people to cooperate effectively  
3/ Since we take advantage of redux-thunk that passed in dispatch function and invoke an action function (usually an async function that makes api calls.  We mainly write action creators that return a function instead of an action. This approach is recommended for complex synchronous action creator or ajax action creators. To make the code more consistent, we try to take advantage arrow function where is possible. 
here is an example: 
export const register = () => async dispatch => {
  programming logic;
  dispatch();
}
4/ Our reducer.js will be put on reducer file and will contains the initialState for a particular feature.  Return action type will take advantage of SWITCH function to make the code more readable.

5/ All of reducer.js of different features will be pooled together using combineReducers function. 

6/ All of AJAX request will be implemented by using FETCH() so that we could learn more about HTTP request. Instead of using AXIOS, which is convinient but hide complexities from new react student. 

7/ We will take advantage of react-router-dom to route our components. Components that requires authentication will be checked before rendering.
  - <Route exact path="/post" render = {() => !autheticated : (Redirect to <login> ) : ( <Post/>) }>

8/ Component will be separated so that each component is only responsible for a specific function . Make code inside component more readable and easier to understand. 
>>>>>>>>>>>>>>>>>>>>>>>BACK-END
9/ our system will use MVC pattern to seperate mongoose models (MODEL), logic related to a route (Controller) and (VIEW) React app . This may reduce our development speed but will pay off if we want to scale up the application. 

10) Route will pooled using express.Router() in the ROUTE.JS file to avoid putting to much code inside app.js. 

11) Any route that require authentication will be protected by an initial middle to check for valid webtoken.

12) Error handling will be delegated to the last route of our app. Thats will check for status code and error message. Thus in our controllers. Errors could be delegated by using throw error or (next(error)) if inside catch propotion.




