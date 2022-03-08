import { Todo } from '../../types/todo.ts'

// const TODOS_URL = `http://localhost:3000/todos`;
import config from '../../config.ts';
const TODOS_URL = config.todos_url;

export default class TodosApiClient {
  static async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${TODOS_URL}`);
    const data = await response.json();

    return data.todos;
  }

  static async createTodo(message: string): Promise<Todo> {
    const response = await fetch(`${TODOS_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data.todo;
  }

  static async updateTodo(id: string, message: string): Promise<void> {
    const response = await fetch(`${TODOS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  }

  static async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${TODOS_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
  }
}
