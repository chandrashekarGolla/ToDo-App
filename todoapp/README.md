# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### `The following are installed before beggining of project `
   1.react-bootstrap   2.react-router-dom  3.json-server  4.reacter-hook-form   5.react-icons   6.axios
   
### `Technologies used`
  1. HTML and CSS 2.bootstrap 3.reactjs 4.javascript

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `start json-server`
### `Command to start the json-server`
### ` json-server --watch database.json --port=4000`
 start the json server in another terminal for local api.

### `Features of the Project`

 1) User can add task ,edit the task and delete the task.

 2) To add the task inputs like taskname,starttime,endtime,category,  status are need to be entered.

 3) User can see the list of todo tasks and  can clear all the tasks with one click.

 4) The tasks can be individually edited and can be deleted. 

 5) History displays the list of deleted tasks and the tasks can be restored and can be edited if required.

 ### `components`

    1. App.js ->contains the routes for addtask,tasklist,history.

    2.AddTodo->contains the inputs for the task to be added.

    3.Tasklist ->Displays the grid of cards of tasks and contains edit,delete and deleteall options.

    4.DeletedToDo->Implementation of deleeting a task and editing the task.

    5.RootLayout->contains the layout of webpage.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
