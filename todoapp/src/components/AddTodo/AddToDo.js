import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './AddToDo.css';
import { MdAddTask } from 'react-icons/md';
import { BiTask ,BiCategory} from 'react-icons/bi';

export default function AddToDo() {


    //to navigate to tasklist after addding a task
    let navigate = useNavigate();
    let { register, handleSubmit, formState: { errors } } = useForm()
    let [err, setError] = useState("")

    //To add a task
    let addNewTask = (addtask) => {
        addtask.id = Math.floor(Math.random() * 100);
        //make http post request to strore data
        fetch("http://localhost:4000/todos", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addtask),
        })
            .then((response) => response.json())
            .then((addtask) => {
                console.log('Success:', addtask);
                navigate("/tasklist")
            })
            .catch((err) => {
                console.log('Error:', err);
                setError(err.message)
            });
    }


    return (
        <div className='taskbox'>
            <h2>What's the plan for today?</h2>
            {/*HTTP error message*/}
            {err.length !== 0 && <p className="error">{err}</p>}
            <div className='row'>
                <div className='col-11 col-sm-8 col-md-4 mx-auto'>
                    <form onSubmit={handleSubmit(addNewTask)}>
                        <div className="form-box">
                            <label htmlFor="taskname"> <BiTask style={{
                                fontSize: "1.5rem",
                                padding:"1px"
                            }} />Task Name</label>
                            <input type="text" id='taskname'
                                className='form-control'
                                {...register("taskname", { required: true })}
                            />
                            {errors.taskname?.type === "required" && <p className='error'>*Please fill task name</p>}
                        </div>

                        <div className='form-box'>
                            <label htmlFor='starttime'>Start time:</label>
                            <input type="time" id="starttime" className='tasktime'{...register("starttime", { required: true })} />
                            {errors.starttime?.type === "required" && <p className='error'>*Choose start time</p>}
                        </div>

                        <div className='form-box'>
                            <label htmlFor='endtime'>End time:</label>
                            <input type="time" id="endtime" className='tasktime'{...register("endtime", { required: true })} />
                            {errors.endtime?.type === "required" && <p className='error'>*Choose End time</p>}
                        </div>
                        <div className='form-box'>
                            <label htmlFor="category"><BiCategory style={{
                                fontSize: "1.5rem",
                                padding:"1px"}}/>Category</label>
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
                                <option value="Later..">Later..</option>
                                <option value="not done">Not done</option>
                            </select>
                        </div>
                        <button type="submit" className='add-task-button'><MdAddTask style={{
                                fontSize: "1.5rem",
                                padding:"1px"}} /> Add</button>

                    </form>
                </div>
            </div>
        </div>
    );
}
