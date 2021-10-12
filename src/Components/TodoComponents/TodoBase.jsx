import React from "react";
import RenderTodoLists from "./RenderTodoLists";
import "./Todo.css";

class TodoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoListData: [],
    };
    this.inputData = "";
    this.textInputRef = null;
  }

  setTextInput = (element) => {
    this.textInputRef = element;
  };

  changeValue = (e) => {
    //console.log("changeValue called");
    if (e.key === "Enter") {
      this.addToList();
      e.target.value = null; // to reset input box(field) as blank
      return;
    }
  };

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  addToList = () => {
    this.inputData = this.textInputRef.value;
    if (!this.inputData) {
      return;
    }

    const { todoListData } = this.state;
    const id = todoListData.length + 1;
    let status = this.getRndInteger(1, 2);
    const updatedTodoList = [
      ...todoListData,
      { id, value: this.inputData, status },
    ];
    this.setState({ todoListData: updatedTodoList });
    this.inputData = null;
    this.textInputRef.value = null;
  };

  markAsComplete = (id) => {
    const { todoListData } = this.state;
    const markingItem = todoListData.filter((item) => item.id === id)[0];
    markingItem.status = 2;
    const updatedTodoList = [...todoListData, { markingItem }];
    this.setState({ todoListData: updatedTodoList });
  };

  markAsPending = (id) => {
    const { todoListData } = this.state;
    const markingItem = todoListData.filter((item) => item.id === id)[0];
    markingItem.status = 1;
    const updatedTodoList = [...todoListData, { markingItem }];
    this.setState({ todoListData: updatedTodoList });
  };

  deleteItem = (id) => {
    const { todoListData } = this.state;
    const updatedTodoList = todoListData.filter((item) => item.id !== id);
    this.setState({ todoListData: updatedTodoList });
  };

  updateItem = (value, id) => {
    const { todoListData } = this.state;
    const updatedItem = todoListData.map((item) => {
      if (item.id === id) {
        item = { ...item, value };
      }
      return item;
    });
    this.setState({ todoListData: updatedItem });
  };

  render() {
    const { todoListData } = this.state;
    return (
      <>
        <h2>TODO LIST</h2>
        <h3>Add Item</h3>
        <div id="input-item">
          <input
            ref={this.setTextInput}
            onKeyUp={this.changeValue}
            type="text"
          />
          <button onClick={this.addToList}>Add</button>
        </div>
        <RenderTodoLists
          listItems={todoListData}
          markAsComplete={this.markAsComplete}
          markAsPending={this.markAsPending}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem}
        />
      </>
    );
  }
}
//Html - https://codepen.io/BeeCodes/pen/MWYEwov

export default TodoBase;
