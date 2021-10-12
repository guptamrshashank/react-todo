import React, { Component } from "react";

class RenderTodoLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editItemId: null,
    };
  }

  handleEditing = (id) => {
    this.setState({
      editItemId: id,
      editing: !this.state.editing,
    });
  };

  checkEditingDone = (event, id) => {
    if (event.key === "Enter") {
      this.handleEditing(id);
    }
  };

  render() {
    const { listItems, markAsComplete, markAsPending, updateItem, deleteItem } =
      this.props;
    const { editing, editItemId } = this.state;
    const pendingItems = listItems.filter((item) => item.status === 1);
    const completedItems = listItems.filter((item) => item.status === 2);

    let viewMode = {};
    let editMode = {};

    if (editing) {
      viewMode.display = "none";
      editMode.display = "block";
    } else {
      viewMode.display = "block";
      editMode.display = "none";
    }

    const liPendingItems = pendingItems.map((item) => {
      const { id, value } = item;
      return (
        <li key={id} style={{ textAlign: "-webkit-auto" }}>
          <input type="checkbox" onClick={() => markAsComplete(id)} />
          <label style={editItemId === id ? viewMode : {}}>{value}</label>
          <input
            type="text"
            value={value}
            style={editItemId === id ? editMode : {}}
            onKeyUp={(event) => this.checkEditingDone(event, id)}
            onChange={(e) => updateItem(e.target.value, id)}
          />
          <button className="edit" onClick={() => this.handleEditing(id)}>
            {editing && editItemId === id ? "Update" : "Edit"}
          </button>
          <button className="delete" onClick={() => deleteItem(id)}>
            Delete
          </button>
        </li>
      );
    });

    const liCompletedItems = completedItems.map((item) => {
      const { id, value } = item;
      return (
        <li key={id} style={{ textAlign: "-webkit-auto" }}>
          <input
            type="checkbox"
            defaultChecked="true"
            onClick={() => markAsPending(id)}
          />
          <label style={editItemId === id ? viewMode : {}}>{value}</label>
          <input
            type="text"
            value={value}
            style={editItemId === id ? editMode : {}}
            onKeyUp={(event) => this.checkEditingDone(event, id)}
            onChange={(e) => updateItem(e.target.value, id)}
          />
          <button className="edit" onClick={() => this.handleEditing(id)}>
            {editing && editItemId === id ? "Update" : "Edit"}
          </button>
          <button className="delete" onClick={() => deleteItem(id)}>
            Delete
          </button>
        </li>
      );
    });

    return (
      <>
        <h3>Pending Items</h3>
        <ul>
          {liPendingItems} {/* dynamic variable rendering */}
        </ul>
        <h3>Completed Items</h3>
        <ul id="completed-tasks">
          {liCompletedItems} {/* dynamic variable rendering */}
        </ul>
      </>
    );
  }
}

export default RenderTodoLists;
