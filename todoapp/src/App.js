import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout'
import AddTodo from './components/AddTodo/AddToDo'
import ToDoHistory from './components/History/ToDoHistory'
import DeletedToDo from './components/DeletedToDo/DeletedToDo'
import TaskList from './components/Tasklist/TaskList';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <AddTodo />
        },
        {
          path: '/tasklist',
          element: <TaskList />
        },
        
        {
          path: '/todohistory',
          element: <ToDoHistory />,
          children: [
            {
              path: 'deletedtodo',
              element: <DeletedToDo />

            }
          ]
        }
      ]
    }
  ])


  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
