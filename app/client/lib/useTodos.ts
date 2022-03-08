import { useCallback, useEffect, useState } from 'react'

import { Todo } from '../../types/todo.ts'
import TodosApiClient from './client/todosApiClient.ts'

type useTodosFunction = [Todo[], string, string, (e: Event) => void, (e: Event) => void, (s: string) => void, (s: string) => void]

export default function useTodos(): useTodosFunction {

  const [todos, setTodos] = useState([])
  const [inputedText, setInputedText] = useState('')
  const [editedTodo, setEditedTodo] = useState('')

  const getTodos = useCallback(async () => {
    try {
      const todos: Todo[] = await TodosApiClient.getTodos();
      console.log(todos);
      setTodos(todos);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
      getTodos()
    }, 
    [getTodos],
  );

  const inputTextHandler = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.value) {
      setInputedText('');
      return;
    }
    // console.log(target.value);
    setInputedText(target.value);
  }

  const submitFormHandler = async (e: Event) => {
    e.preventDefault();
    setEditedTodo('');
    setInputedText('');

    if (inputedText.length === 0) {
      return;
    }

    if (editedTodo) {
      await editTodo(editedTodo, inputedText);
    } else {
      await createTodo(inputedText);
    }
    getTodos();
  }
  
  const createTodo = async (message: string) => {
    const todo = await TodosApiClient.createTodo(message);
    let t = todos ? [...todos, todo] : [todo];
    setTodos(t);
  }

  const editTodo = async (id: string, message: string) => {
    await TodosApiClient.updateTodo(id, message);
  }

  const setEditModeHandler = useCallback(async (id: string) => {
    setEditedTodo(id);
  }, []);

  const deleteTodoHandler = useCallback(async (id: string) => {
    await TodosApiClient.deleteTodo(id);
    getTodos();
  }, []);


  return [
    todos, 
    inputedText, 
    editedTodo, 
    submitFormHandler, 
    inputTextHandler, 
    setEditModeHandler, 
    deleteTodoHandler
  ];
}
