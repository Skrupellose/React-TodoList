import React, { Component } from 'react';
import './App.css';
import Todolist from './components/Todolist.jsx';
class App extends Component {
  render() {
    return(
        <div>
            <Todolist/>
        </div>
    )
  }
}
export default App;