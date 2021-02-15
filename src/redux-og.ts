import { v1 as uuid } from "uuid";
import { todos } from "./App";
import { Todo } from "./type";
import { combineReducers } from "redux"

// constants
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";

// actions & action types
interface CreateTodoActionType {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export const createTodoActionCreator = ({
  desc,
}: {
  desc: string;
}): CreateTodoActionType => {
  return {
    type: CREATE_TODO,
    payload: {
      id: uuid(),
      desc,
      isComplete: false,
    },
  };
};

interface EditTodoActionType {
  type: typeof EDIT_TODO;
  payload: { id: string; desc: string };
}

export const editTodoActionTypeCreator = ({
  id,
  desc,
}: {
  id: string;
  desc: string;
}): EditTodoActionType => {
  return {
    type: EDIT_TODO,
    payload: { id, desc },
  };
};

interface ToggleTodoActionType {
  type: typeof TOGGLE_TODO;
  payload: { id: string; isComplete: boolean };
}

export const toggleTodoActionCreator = ({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}): ToggleTodoActionType => {
  return { type: TOGGLE_TODO, payload: { id, isComplete } };
};

interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: { id: string };
}

export const DeleteTodoActionCreator = ({
  id,
}: {
  id: string;
}): DeleteTodoActionType => {
  return { type: DELETE_TODO, payload: { id } };
};

interface SelectTodoActionType {
  type: typeof SELECT_TODO;
  payload: { id: string };
}

export const selectTodoActionCreator = ({
  id,
}: {
  id: string;
}): SelectTodoActionType => {
  return { type: SELECT_TODO, payload: { id } };
};

type TodoActionTypes =
  | CreateTodoActionType
  | EditTodoActionType
  | DeleteTodoActionType
  | ToggleTodoActionType;

// Reducers

const todosInitialState: Todo[] = [...todos];

const todoReducer = (
  state: Todo[] = todosInitialState,
  action: TodoActionTypes
) => {
  switch (action.type) {
    case CREATE_TODO: {
      const { payload } = action;
      return [...state, payload];
    }
    case EDIT_TODO: {
      const {
        payload: { id, desc },
      } = action;
      return state.map((todo) => (todo.id === id ? { ...todo, desc } : todo));
    }
    case TOGGLE_TODO: {
      const {
        payload: { id, isComplete },
      } = action;
      return state.map((todo) =>
        todo.id === id ? { ...todo, isComplete } : todo
      );
    }
    case DELETE_TODO: {
      const {
        payload: { id },
      } = action;
      return state.filter((todo) => todo.id !== id);
    }
    default: {
      return state;
    }
  }
};

type SelectTodoActionTypes = SelectTodoActionType;

const selectedTodoReducer = (
  state: string | null = null,
  action: SelectTodoActionTypes
) => {
  switch (action.type) {
    case SELECT_TODO: {
      const {
        payload: { id },
      } = action;
      return id;
    }
    default: {
      return state;
    }
  }
};

const counterReducer = (state: number = 0, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO: {
      return state + 1;
    }
    case EDIT_TODO: {
      return state + 1;
    }
    case DELETE_TODO: {
      return state + 1;
    }
    case TOGGLE_TODO: {
      return state + 1;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
    todos: todoReducer,
    selectedTodo: selectedTodoReducer,
    counter: counterReducer
})
