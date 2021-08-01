import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditTodo = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const [todoObj, setTodoObj] = useState({
        todo: "",
        todoStatus: false,
    });
    useEffect(() => {
        console.log("xxxxppppp");
        editTodos();
    }, []);
    console.log( "props is",props)
    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3003/users/${id}`, todoObj);
        history.push("/");
    }
    const handleChange = (event) => {
        // console.log("value is", event.target.value);
        setTodoObj({ ...todoObj, [event.target.name]: event.target.value });
        // console.log("check it", todoObj)
        // setTodoObj(todoObj);
    };
    const editTodos = async () => {
        // console.log("mmmmmm");
        const resp = await axios.get(`http://localhost:3003/users/${id}`);
        // console.log("edituser", resp);
        setTodoObj(resp.data);
    }

    return (
        <div>
            <h2>Edit Todo</h2>
            <form onSubmit={(e) => submitHandler(e)}>
                <input
                    className="searchbox2"
                    type="text"
                    name="todo"
                    // placeholder= {todoObj.todo}
                    value={todoObj.todo}
                    onChange={handleChange.bind(this)} />
                <div >
                    <button className="addtask" type="submit" >Edit task</button>
                </div>
            </form>
        </div>
    )
}
export default EditTodo;