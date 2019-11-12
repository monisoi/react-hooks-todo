import React, { useState, useReducer } from "react";
import "./Todo.css";
import taskReducer, {
  initialTaskState,
  createAction,
  completeAction,
  completeAllAction,
  deleteAction,
  deleteAllCompletedAction
} from "./task";

export const Todo: React.FC = () => {
  const [text, setText] = useState("");
  const [displayPattern, setDisplayPattern] = useState("ALL");
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const extractDisplayTasks = () => {
    switch (displayPattern) {
      case "ACTIVE": {
        return state.tasks.filter(t => !t.isCompleted);
      }
      case "COMPLETED": {
        return state.tasks.filter(t => t.isCompleted);
      }
      default:
        return state.tasks;
    }
  };
  const getActiveNumber = () => state.tasks.filter(t => !t.isCompleted).length;
  const getCompletedNumber = () => state.tasks.filter(t => t.isCompleted).length;
  const renderTasks = () =>
    extractDisplayTasks().map(task => (
      <div className="Todo-task" key={task.id}>
        <div
          className="Todo-task-complete"
          onClick={() => dispatch(completeAction(task))}
        >
          {task.isCompleted ? "✓" : "-"}
        </div>
        <div className="Todo-task-name">{task.name}</div>
        <div
          className="Todo-task-delete"
          onClick={() => {
            dispatch(deleteAction(task));
          }}
        >
          x
        </div>
      </div>
    ));
  const renderController = () => (
    <div className="Todo-control">
      <div className="Todo-control-left-num">
        {getActiveNumber() === 1
          ? "1 item left"
          : `${getActiveNumber()} items left`}
      </div>
      <div
        className="Todo-control-display-button"
        onClick={() => setDisplayPattern("ALL")}
      >
        All
      </div>
      <div
        className="Todo-control-display-button"
        onClick={() => setDisplayPattern("ACTIVE")}
      >
        Active
      </div>
      <div
        className="Todo-control-display-button"
        onClick={() => setDisplayPattern("COMPLETED")}
      >
        Completed
      </div>
      <div
        className="Todo-control-delete-completed"
        onClick={() => dispatch(deleteAllCompletedAction())}
      >
        {getCompletedNumber() > 0 ? "Clear Completed" : null}
      </div>
    </div>
  );
  return (
    <div className="Todo-area">
      <form className="Todo-form">
        <div
          className="Todo-form-complete-all"
          onClick={() => dispatch(completeAllAction())}
        >
          ✓
        </div>
        <input
          className="Todo-form-input"
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              if (text !== "") {
                dispatch(
                  createAction({
                    id: Math.floor(Math.random() * (100000 - 10000)) + 10000,
                    name: text,
                    isCompleted: false
                  })
                );
                setText("");
              }
              e.preventDefault();
            }
          }}
        />
      </form>
      <div>{renderTasks()}</div>
      {state.tasks.length > 0 ? renderController() : null}
    </div>
  );
};
