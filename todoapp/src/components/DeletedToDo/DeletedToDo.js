import React, { useEffect, useState } from "react";
import "./DeletedToDo.css";
import axios from "axios";
import {FaTrashRestore} from 'react-icons/fa';

function DeletedToDo() {
  //deleted users state
  let [deletedTasks, setDeletedTasks] = useState([]);
  //error state
  let [err, setError] = useState("");
  useEffect(() => {
    getRemovedTasks();
  }, []);

  //To get removed Tasks
  const getRemovedTasks = () => {
    axios
      .get("http://localhost:4000/deletedTodos")
      .then((res) => {
        if (res.status === 200) {
          setDeletedTasks(res.data);
        } else {
          throw new Error("Something went wrong ");
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.message);
        } else if (error.request) {
          setError(error.message);
        } else {
          setError(error.message);
        }
      });
  };


  //to restore deleted task
  const restoreTask = (task) => {
    axios
      .post(`http://localhost:4000/todos`, task)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // to delete task from todos
          axios
            .delete(`http://localhost:4000/deletedTodos/${task.id}`)
            .then((res) => {
              if (res.status === 200) {
                getRemovedTasks();
              }
            });

          //clear error message
          setError("");

        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          
        } else if (err.request) {
          setError(err.message);

        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div className="removedTasks">
      <p id="heading" className='mt-5 '>Deleted Tasks</p>
      {deletedTasks.length === 0 ? (
        <div className="text-center">
          <p className="empty">Ohh!Deleted Task List is Empty !</p>
        </div>
      ) : (
        <ul className="removed-Taskslist">
          {deletedTasks.map((task) => (
            <li key={task.id}>
              <div>
                <p className="removed-taskname"> Task name: {task.taskname}</p>
                <p className="removed-taskname">Category: {task.category}</p>
                <p className="removed-taskname">Status: {task.status}</p>
              </div>
              <div>
                {/* task restore button */}
                <button
                  className="task-restore-button" id="button1"
                  onClick={() => restoreTask(task)}
                >
                  <FaTrashRestore  style={{margin:"2px"}}/> Restore
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeletedToDo;