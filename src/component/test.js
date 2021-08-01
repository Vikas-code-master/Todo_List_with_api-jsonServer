import axios from "axios";
import { Component, useEffect, useState } from "react"
import delIcon from './Assets/icon-delete.svg'
export class Test extends Component {
    constructor() {
        super();
        this.state = {
            AllData: [],
            person: {
                firstName: '',
                lastName: ''
            }
        }
    }
    loadUsers = async () => {
        const res = await axios.get("http://localhost:3003/users");
        console.log("res is", res.data);
        this.setState({ AllData: res.data });
    }
    componentDidMount() {
        console.log("test component ")
        this.loadUsers();
        // fetch("user.json")
        // .then(data=>data.json())
        // .then(res=>{console.log(res)})
    }
    componentDidUpdate(prprop,prst){
        if(prst.person!=this.state.person){
            console.log("this",this.state.person)
            this.loadUsers();
        }
        
    }
    submitHandler = async (e) => {
        e.preventDefault();
        console.log(this.state.person)
        // this.setState({firstName : ""})
        await axios.post("http://localhost:3003/users", this.state.person);
        this.loadUsers();
    }
    deleteUser = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:3003/users/${id}`);
        this.loadUsers();
    };
    handleChange(event) {
        let person = this.state.person;
        person[event.target.name] = event.target.value;
        this.setState({ person });
    }
    render() {
        return (
            <>
                <div>
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        <input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange.bind(this)} />
                        {/* <input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange.bind(this)} /> */}
                        <button type="submit">submit</button>
                    </form>

                    {/* <button onClick={() => this.deleteUser(15)}>delete</button> */}
                </div>
                <div>
                    {
                        this.state.AllData.map((item, index) => {
                            return <p>{item.title}{item.firstName}{item.lastName} <img onClick={() => this.deleteUser(item.id)} src={delIcon} /> </p>

                        }
                        )
                    }
                </div>
            </>
        )
    }
}