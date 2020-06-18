import React from 'react';
import storage from '../storage';
import { Input, Button } from 'antd';
import '../assets/css/todoList.scss'
class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      finishList: [],
      inputValue: '',
      flag: false,
      edit: false,
      index: 0
    };
  }
  componentDidMount() {
    let list = storage.get("TodoList");
    if (list) {
      this.setState({
        finishList: list
      })
    }
  }
  addList = () => {
    let title = this.state.inputValue
    let edit = this.state.edit
    let index = this.state.index
    console.log(title)
    if (edit) {
      let templist = this.state.finishList;
      templist[index].title = this.state.inputValue
      this.setState({
        todoList: templist,
        inputValue: ''
      });
      storage.set("TodoList", templist);
    } else {
      let tempList = this.state.finishList;
      tempList.push({
        title: title,
        finished: false
      })
      this.setState({
        todoList: tempList,
        inputValue: ''
      });
      storage.set("TodoList", tempList);
    }
    this.changeDisplay()
  }
  changeDisplay = () => {
    this.setState({
      flag: !this.state.flag,
    })
  }
  changeEdit = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }
  changeInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }
  changeState = (i) => {
    let templist = this.state.finishList;
    templist[i].finished = !templist[i].finished;
    this.setState({
      todoList: templist
    });
    storage.set("TodoList", templist);
  }
  doList = (i) => {
    this.changeState(i)
  }
  deleteList = (i) => {
    let templist = this.state.finishList;
    templist.splice(i, 1);
    this.setState({
      todoList: templist
    })
    storage.set("TodoList", templist);
  }
  editList = (i) => {
    this.changeDisplay()
    this.changeEdit()
    this.setState({
      index: i
    })
  }

  render() {
    const flag = this.state.flag
    let content, button
    if (flag) {
      content = <div className="menu">
        <Input onChange={this.changeInput} onPressEnter={this.addList} value={this.state.inputValue} />
        <Button type="primary" className="button" onClick={this.addList}>确定</Button>
      </div>
      button = <Button type="danger" onClick={this.changeDisplay}>关闭</Button>
    } else {
      button = <Button onClick={this.changeDisplay}>新增</Button>
    }
    return (
      <div className="container">
        <div className="content">
          <div className="header">
            <h2>Todolist</h2>
            {content}
            {button}
          </div>
          <div className="body">
            <div className="working">
              <h2>未完成事项</h2>
              {
                this.state.finishList.map((item, index) => {
                  if (item.finished === false) {
                    return (
                      <div key={index} className="list-item">
                        <div className="show-item">
                          {item.title}
                        </div>
                        <div>
                          <Button type="primary" onClick={this.editList.bind(this, index)}>编辑</Button>
                          <Button type="danger" onClick={this.deleteList.bind(this, index)}>删除</Button>
                          <Button type="dashed" onClick={this.doList.bind(this, index)}>完成</Button>
                        </div>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>

            <div className="worked">
              <h2>已完成事项</h2>
              {
                this.state.finishList.map((item, index) => {
                  if (item.finished === true) {
                    return (
                      <div key={index} className="list-item">
                        <div className="show-item worked">
                          {item.title}
                        </div>
                        <div>
                          <Button type="primary" onClick={this.editList.bind(this, index)}>编辑</Button>
                          <Button type="danger" onClick={this.deleteList.bind(this, index)}>删除</Button>
                          <Button type="dashed" onClick={this.changeState.bind(this, index)}>撤回</Button>
                        </div>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default Todolist;