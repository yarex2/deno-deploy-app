import React from 'react'

import { Todo } from '../types/todo.ts'
import useTodos from '../lib/useTodos.ts'


export default function TodoList() {
  const [
    todos, 
    inputedText, 
    editedTodo, 
    submitFormHandler, 
    inputTextHandler, 
    setEditModeHandler, 
    deleteTodoHandler
  ] = useTodos()

    return (
      <div>
        <div className="todo-form">
          <form onSubmit={submitFormHandler}>
            <label>Enter todo message</label>
            <input type="text" 
              name="message" 
              value={inputedText}
              onChange={inputTextHandler}
            />
            <button type="submit">Add/Edit todo</button>
          </form>
        </div>
        {todos && todos.length > 0 && (
          <ul className="todo-list">
            {todos.map((todo: Todo) => (
              <li key={todo.id}>
                <div>
                  <div className="todo-message">{todo.message}</div>
                  <div className="todo-buttons">
                    <button className="btn-edit" onClick={() => setEditModeHandler(todo.id)}>Edit</button>
                    <button className="btn-delete" onClick={() => deleteTodoHandler(todo.id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
    );
}
