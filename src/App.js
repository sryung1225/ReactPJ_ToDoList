import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

  //state 정의
  id = 3 //이미 0,1,2가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      { id: 0, text: 'GitHub 갱신하기', checked: false},
      { id: 1, text: '필기 정리하기', checked: true},
      { id: 2, text: '인강 듣기', checked: false}
    ],
    color: '#343a40'
  }


  //개체 생성
  handleChange = (e) => {
    this.setState({
      input: e.target.value //input의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      input: '', //input 비우고
      //concat을 사용해 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }

  handleKeyPress = (e) => {
    //눌러진 키가 Enter 면 handleCreate 호출
    if(e.key == 'Enter') {
      this.handleCreate();
    }
  }


  //개체에 체크하고, 체크풀기
  handleToggle = (id) => {
    const {todos} = this.state;

    //파라미터로 받은 id를 가지고 몇번째 id인지 찾기
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 개체

    const nextTodos = [...todos]; //배열을 복사

    //기존 값들을 복사하고 checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  //개체 제거하기
  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }


  //팔레트
  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }


  render() {
    const { input, todos, color } = this.state;
    const { handleChange, handleCreate, handleKeyPress, handleToggle, handleRemove, handleSelectColor } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
      palette={(
        <Palette 
          colors={colors}
          selected={color}
          onSelect={handleSelectColor}
        />
      )}>
        <TodoItemList 
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    );
  }
}

export default App;