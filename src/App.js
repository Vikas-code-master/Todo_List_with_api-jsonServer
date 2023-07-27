
import './App.css';
import { Test } from './component/test';
import { Home } from './component/Home';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import DoneTodo from './component/DoneTodo';
import Todo from './component/Todo';
import EditTodo from './component/EditTodo';
import { About } from './component/About';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {

  const [todoAllList,setTodoAllList] = useState([]);
  const loadTodoList = async () => {
    const res = await axios.get("http://localhost:3003/users");
    console.log("appdata is", res.data);
    setTodoAllList(res.data);
  }
  useEffect(()=>{
    loadTodoList();
  },[])
  return (

    <div className="App">
      <h2 className="Headers">Todo List App</h2>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/todo-list"><Todo allList = {todoAllList}/> </Route>
          <Route exact path="/done-todo" component={()=><DoneTodo allList ={todoAllList}/>}/>
          <Route exact path="/edit-todo/:id" component={EditTodo} />
          {/* <Route exact path="/about" component={About} /> */}
          <Route>404 not found </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
