import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { GrSave } from "react-icons/gr";
import axios from 'axios';
import './TaskList.css'
function TaskList() {

  //task state
  let [todos, settodos] = useState([])
  let { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

  // HTTP request set errors
  let [error, setError] = useState("")

  // to save edited task id for HTTp request
  let [taskToEdit, setTaskToEdit] = useState({})

  //modal state
  let [show, setShow] = useState(false);

  let displayModal = () => setShow(true)
  let closeModal = () => setShow(false)


  useEffect(() => getTasks(), [todos.length]);

  //HTTp post request
  let getTasks = () => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        if (res.status === 200) {
          settodos(res.data);
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
          // for other errors
        } else {
          setError(err.message);
        }
      });

  };

  //function to edit task
  let editTask = (taskObjToEdit) => {
    displayModal()
    setTaskToEdit(taskObjToEdit)
    setValue('taskname', taskObjToEdit.taskname)
    setValue('starttime', taskObjToEdit.starttime)
    setValue('endtime', taskObjToEdit.endtime)
    setValue('category', taskObjToEdit.category)
    setValue('status', taskObjToEdit.status)
  }

  // function to save edited tasks
  let saveTask = () => {
    closeModal()
    let editedTask = getValues();
    editedTask.id = taskToEdit.id;

    //HTTP rquest to save edited changes
    axios
      .put(`http://localhost:4000/todos/${editedTask.id}`, editedTask)
      .then((res) => {
        if (res.status === 200) {
          //get edited tasks
          getTasks();
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
  }

  //To clear All tasks
  let deleteAllTasks = (task) => {

    task.map((task) =>
      axios.delete(`http://localhost:4000/todos/${task.id}`)
        .then(res => {
          if (res.status === 200) {
            getTasks();
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
        })

    )
  }

  //to deleted todo task
  let deleteTask = (task) => {
    axios
      .post(`http://localhost:4000/deletedTodos`, task)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // remove task from todos
          axios.delete(`http://localhost:4000/todos/${task.id}`)
            .then(res => {
              if (res.status === 200) {
                getTasks();
              }
            })
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
    <div className='tasklist'>
      {todos.length!==0? (
        <div>
      <h2>Hey! Your Task List</h2>
      <div className='container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 '>
        {
          todos.map(todosobj => <div className='col' key={todosobj.id}>
            <div className='card'>
              <div className='card-body'>
                <p><span>Task Name: </span>{todosobj.taskname}</p>
                <p> <span>From: </span>{todosobj.starttime}</p>
                <p> <span>To: </span>{todosobj.endtime}</p>
                <p> <span>Category: </span>{todosobj.category}</p>
                <p><span>Status: </span>{todosobj.status}</p>

                {/* To Edit Todo task*/}
                <button className="button btn btn-warning float-start"
                  onClick={() => editTask(todosobj)}>
                  <MdModeEdit />Edit
                </button>

                {/*To delete Todo task*/}
                <button className="button btn btn-danger float-end"
                  onClick={() => deleteTask(todosobj)}>
                  <MdDelete style={{ color: "black" }} />Delete
                </button>
              </div>

            </div>
          </div>)
        }
      </div>
      <div className='clear-button'>
        <button className='btn btn-dark clear-button mt-5  fw-bold'
          onClick={() => deleteAllTasks(todos)}>
          <MdDelete style={{ color: "white", fontSize: "1.2rem" }}/>
          Clear All
        </button>
      </div>
      <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        centered
        className='modal'>
        <Modal.Header>
          Edit Task
        </Modal.Header>
        <ModalBody>
          <form onSubmit={handleSubmit(getTasks)} >
            <div className="form-box">
              <label htmlFor="taskname">Task Name</label>
              <input type="text" id='taskname'
                className='form-control'
                {...register("taskname", { required: true })}
              />
            </div>

            <div className='form-box'>
              <label htmlFor='starttime'>Start time:</label>
              <input type="time" id="starttime" className='tasktime'{...register("starttime", { required: true })} />
             
            </div>

            <div className='form-box'>
              <label htmlFor='endtime'>End time:</label>
              <input type="time" id="endtime" className='tasktime'{...register("endtime", { required: true })} />
              
            </div>
            <div className='form-box'>
              <label htmlFor="category">Category</label>
              <select id="category" {...register("category", { required: true })} className="form-select" defaultValue={"default"} >
                <option value="defalut" disabled>Choose Category</option>
                <option value="personal">Personal</option>
                <option value="office">Office</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className='form-box'>
              <label htmlFor="status">Status</label>
              <select id="status" {...register("status", { required: true })} className="form-select " defaultValue={"default"}  >
                <option value="defalut" disabled>Choose Category</option>
                <option value="completed">Completed</option>
                <option value="Later...">Later..</option>
                <option value="not done">Not Done</option>
              </select>
            </div>

          </form>

        </ModalBody>
        <Modal.Footer>
          <button onClick={saveTask} className="btn btn-info"><GrSave />Save</button>
        </Modal.Footer>
      </Modal>
      </div>):
      (
        <div className='empty'>
            <h1>Ohh! Your Task List is Empty!</h1>
        </div>
        
      )
    }
    </div>
  )
}

export default TaskList