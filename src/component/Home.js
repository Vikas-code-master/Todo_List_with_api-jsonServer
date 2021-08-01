import axios from "axios";
import { Component } from "react";
import delIcon from './Assets/icon-delete.svg';
import edit from "./Assets/icon-edit.svg";
import clickIcon from "./Assets/click_icon.png";
import './Home.css'
import { Link } from "react-router-dom";
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoAllList: [],
            editStatus: false,
            todoObj: {
                todo: "",
                todoStatus: false,
            }
        }
    }
    loadTodoList = async () => {
        const res = await axios.get("http://localhost:3003/users");
        console.log("res is", res.data);
        this.setState({ todoAllList: res.data });
    }
    componentDidMount() {
        this.loadTodoList();
    }
    componentDidUpdate(preProp,preState){
        if(preState.todoAllList == this.state.todoAllList)
        this.loadTodoList();
    }
    handleChange = (event) => {
        let todoObj = this.state.todoObj;
        todoObj[event.target.name] = event.target.value;
        this.setState({ ...todoObj, todoObj });
    };
    submitHandler = async (e) => {
        e.preventDefault();
        if (this.state.todoObj.todo) {
            await axios.post("http://localhost:3003/users", this.state.todoObj);
        }
        this.loadTodoList();
        this.setState({ todoObj: { todo: "", todoStatus: false } })
        // editStatus ? await axios.put(`http://localhost:3003/users/${id}`,this.state.todoObj):"none";
        // this.setState({editStatus:false})
    }
    deleteTodo = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:3003/users/${id}`);
        this.loadTodoList();
    };
    completionStatus = async (val, indx) => {
        let stats = "todoStatus";
        let res = this.state.todoAllList.filter((item) => {
            return item.id == indx;
        });
        let doneArr = res[0][stats];
        console.log("compass", doneArr)
        // this.setState({
        let todoObj = {
            todo: `${val} (completed)`,
            todoStatus: true
        }
        // })
        await axios.put(`http://localhost:3003/users/${indx}`, todoObj);
        // console.log("after", this.state.todoObj)
        this.loadTodoList();
    }
    deleteDoneTask = () => {
        this.state.todoAllList.map(async (item, idx) => {
            if (item.todoStatus == true) {
                console.log("dddd is", item, idx)
                // doneArr.push(item);
                axios.delete(`http://localhost:3003/users/${item.id}`);
            }
            // this.loadTodoList();
        })
        this.loadTodoList();
    }
    deleteAllTask = () => {
        this.state.todoAllList.map(async (item, idx) => {
            console.log("delAll", item.id)
            axios.delete(`http://localhost:3003/users/${item.id}`);
        })
        this.loadTodoList();
        this.setState({ todoAllList: [] })
    }
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        <input
                            className="searchbox2"
                            type="text"
                            placeholder="New Todo"
                            name="todo"
                            value={this.state.todoObj.todo}
                            onChange={this.handleChange.bind(this)} />
                        <div >
                            <button className="addtask" type="submit" >Add new task</button>
                        </div>
                    </form>
                </div>
                <h2 className="todo-list">Todo List </h2>
                <div id="listheader" >

                    <div className="todolisthead" onClick={this.showTodoTask}>All</div>
                    <div className="todolisthead">< Link to="/done-todo" >Done</Link></div>
                    <div className="todolisthead">< Link to="/todo-list" >Todo</Link></div>

                </div>
                <div>
                    {
                        this.state.todoAllList.map((item, index) => {
                            return <div id="list-job">
                                <div className="imageCheck"> <div className="value">{`${item.todo}`}</div>
                                    <div className="imageedit" > <Link to={`edit-todo/${item.id}`} ><img src={edit} /></Link> </div>
                                    <div className="imgdelete" onClick={() => this.deleteTodo(item.id)} ><img src={delIcon} /></div>
                                    <div className="clickIcon"><img className="clickImage" onClick={() => this.completionStatus(item.todo, item.id)} src={clickIcon} /></div>
                                </div>
                            </div>
                        })}
                </div>
                <div className="deletetask">
                    <div className="deletetask1" onClick={this.deleteDoneTask} >Delete done tasks</div>
                    <div className="deletetask1" onClick={this.deleteAllTask} >Delete All tasks</div>
                </div>
                </div>
                )
    }
}