import axios from "axios";
import { Component, useEffect, useState } from "react";

import delIcon from './Assets/icon-delete.svg';
import edit from "./Assets/icon-edit.svg";
import clickIcon from "./Assets/click_icon.png";
import { Link } from "react-router-dom";

const Todo = (props) => {
    const [todolist, setTodoList] = useState([]);
    console.log("todo props",props.allList);
    let doneArr = [];
    const resultsList = props.allList.filter((item)=>{
        console.log("doneitem is", item)
        if(item.todoStatus!=true){
            console.log("itemin is", item)
            doneArr.push(item);
            return item
        }
    })
    console.log("res data",resultsList);
    useEffect(()=>{
        setTodoList(resultsList);
    },[])
    // const loadTodoList = async () => {
    //     const res = await axios.get("http://localhost:3003/users");
    //     console.log("res is", res.data);
    //     let doneArr = [];
    //     props.allList.map((item)=>{
    //         console.log("doneitem is", item)
    //         if(item.todoStatus!=true){
    //             console.log("itemin is", item)
    //             doneArr.push(item);
    //         }
    //     })
    //     console.log("doneitem is", doneArr)
    //     setDoneList(doneArr);
    //     // this.setState({ todoAllList: res.data });
    // }
    // useEffect(() =>
    //     loadTodoList() 
    //     ,[])
    return (
        <div>
            <h2>Todo list</h2>
            <div>
                {
                    todolist.map((item)=>{
                        return <div id="list-job">
                                <div className="imageCheck"> <div className="value">{`${item.todo}`}</div>
                                    <div className="imageedit" > <Link to={`edit-todo/${item.id}`}><img src={edit} /></Link> </div>
                                    {/* <div className="imgdelete" onClick={() => this.deleteTodo(item.id)} ><img src={delIcon} /></div>
                                    <div className="clickIcon"><img className="clickImage" onClick={()=>this.completionStatus(item.todo,item.id)} src={clickIcon} /></div> */}
                                </div>
                            </div>
                    })
                }
            </div>
        </div>
    )
}
export default Todo;