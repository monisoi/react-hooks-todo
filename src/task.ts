export type task = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export type taskState = {
  tasks: task[];
};

export const createAction = (task: task) => {
  return {
    type: "CREATE",
    task
  };
};

export const completeAction = (task: task) => {
  return {
    type: "COMPLETE",
    task
  };
};

export const completeAllAction = () => {
  return {
    type: "COMPLETE_ALL"
  };
};

export const deleteAction = (task: task) => {
  return {
    type: "DELETE",
    task
  };
};

export const deleteAllCompletedAction = () => {
  return {
    type: "DELETE_ALL_COMPLETED"
  };
};

type CreateAction = ReturnType<typeof createAction>;
type CompleteAction = ReturnType<typeof completeAction>;
type CompleteAllAction = ReturnType<typeof completeAllAction>;
type DeleteAction = ReturnType<typeof deleteAction>;
type DeleteAllCompletedAction = ReturnType<typeof deleteAllCompletedAction>;

type Actions =
  | CreateAction
  | CompleteAction
  | CompleteAllAction
  | DeleteAction
  | DeleteAllCompletedAction;

export const initialTaskState: taskState = {
  tasks: []
};

const deleteTask = (orgTasks: task[], taskId: number) => {
  const targetId = orgTasks.findIndex(t => t.id === taskId);
  const head = orgTasks.slice(0, targetId);
  const tail = orgTasks.slice(targetId + 1, orgTasks.length);
  return head.concat(tail);
};

const deleteAllCompletedTasks = (orgTasks: task[]) => {
  return orgTasks.filter(t => !t.isCompleted);
};

const completeTask = (orgTasks: task[], taskId: number) => {
  const targetId = orgTasks.findIndex(t => t.id === taskId);
  orgTasks[targetId].isCompleted = !orgTasks[targetId].isCompleted;
  return orgTasks;
};

const completeAllTasks = (orgTasks: task[]) => {
  const isAllCompleted = !orgTasks.some(t => !t.isCompleted);
  orgTasks.forEach(t => isAllCompleted ? t.isCompleted = false : t.isCompleted = true);
  return orgTasks;
};

export default (state: taskState = initialTaskState, action: Actions) => {
  switch (action.type) {
    case "CREATE": {
      return "task" in action
        ? {
            ...state,
            tasks: [...state.tasks, action.task]
          }
        : state;
    }
    case "COMPLETE": {
      return "task" in action
        ? {
            ...state,
            tasks: completeTask(state.tasks, action.task.id)
          }
        : state;
    }
    case "COMPLETE_ALL": {
      return {
        ...state,
        tasks: completeAllTasks(state.tasks)
      };
    }
    case "DELETE": {
      return "task" in action
        ? {
            ...state,
            tasks: deleteTask(state.tasks, action.task.id)
          }
        : state;
    }
    case "DELETE_ALL_COMPLETED": {
      return {
        ...state,
        tasks: deleteAllCompletedTasks(state.tasks)
      };
    }
    default: {
      return state;
    }
  }
};
