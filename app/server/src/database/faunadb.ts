import { CreateTodoDto } from '../types/dto/createTodoDto.ts';
import { FilterGetTodos } from '../types/dto/filterGetTodos.ts';
import { UpdateTodoDto } from '../types/dto/updateTodoDto.ts';

import { Todo } from '../types/todo.ts';

const FAUNADB_EU_URL = "https://graphql.eu.fauna.com/graphql";

export class FaunaDbTodosClient {
  constructor(
    private readonly token: string,
    private readonly url: string,
  ) {}

  async getTodos(filterGetTodos: FilterGetTodos): Promise<Todo[]> {
    const { limit, offset } = filterGetTodos
    const query = `
      query($limit: Int!) {
        getTodos(_size: $limit) {
          data {
            _id
            message
          }
        }
      }
    `;
    
    try {
      return this.queryFaunaDb(query, { limit, offset });
    } catch (error) {
      throw error;
    }
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { message, timestamp } = createTodoDto;
    const timestampStr = timestamp.toString();

    const query = `
      mutation($message: String!, $timestamp: String!) {
        createTodo(data: {
          message: $message,
          timestamp: $timestamp
        }) {
          _id
          message
          timestamp
        }
      }
    `;

    try {
      return this.queryFaunaDb(query, { message, timestamp: timestampStr });
    } catch (error) {
      throw error;
    }
  }
    

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id, message } = updateTodoDto;
    const query = `
      mutation($id: ID!, $message: String!) {
        updateTodo(
          id: $id,
          data: {
            message: $message
          }
        ) {
          _id
          message
        }
      }
    `;

    try {
      return this.queryFaunaDb(query, { id, message });
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const query = `
      mutation($id: ID!) {
        deleteTodo(id: $id) {
          _id
        }
      }
    `;

    try {
      await this.queryFaunaDb(query, { id });
    } catch (error) {
      throw error;
    }
  }

  private async queryFaunaDb(
    query: string,
    variables: { [key: string]: unknown }
  ): Promise<any> {
    try {
      const res = await fetch(this.url || FAUNADB_EU_URL, {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
  
      const { data, errors } = await res.json();
      if (errors) {
        throw errors[0];
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  }

}