import { Context } from "../deps.ts";

import { CreateTodoDto } from '../types/dto/createTodoDto.ts';
import { FilterGetTodos } from '../types/dto/filterGetTodos.ts';
import { UpdateTodoDto } from '../types/dto/updateTodoDto.ts';

import { Todo } from '../types/todo.ts';

interface DbClient {
  getTodos(filterGetTodos: FilterGetTodos): Promise<Todo[]>;
  createTodo(createTodoDto: CreateTodoDto): Promise<Todo>;
  updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}

export class TodosController {
  constructor(
    private dbClient: DbClient,
  ) {}


  async getTodos(ctx: Context): Promise<void> {
    const limit = parseInt(ctx.request.url.searchParams.get('limit') as string) || 10;
    const page = parseInt(ctx.request.url.searchParams.get('page') as string) || 1;
    const offset = (page - 1) * limit;

    const filter: FilterGetTodos = { limit, offset }

    try {
      const todos = await this.dbClient.getTodos(filter);
      ctx.response.body = { todos: todos };
    } catch (error) {
      console.error(error);
    }
  }

  async createTodo(ctx: Context): Promise<void> {
    const data = await ctx.request.body({ type: "json" }).value;
    const todo: CreateTodoDto = {
      id: crypto.randomUUID(),
      message: data.message,
      timestamp: Date.now(),
    };

    try {
      const createdTodo = await this.dbClient.createTodo(todo);
      ctx.response.body = { 
        message: `Todo with id ${createdTodo.id} CREATED`, 
        todo: createdTodo,
    };
    } catch (error) {
      console.error(error);
    }
  }

  async updateTodo(ctx: Context): Promise<void> {
    const id = ctx.params.id!;
    const data = await ctx.request.body({ type: "json" }).value;

    const todo: UpdateTodoDto = {
      id,
      message: data.message,
    };

    try {
      const updatedTodo = await this.dbClient.updateTodo(todo);
      ctx.response.body = { 
        message: `Todo with id ${updatedTodo.id} UPDATED`,
        todo: updatedTodo,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTodo(ctx: Context): Promise<void> {
    const id = ctx.params.id!;

    try {
      await this.dbClient.deleteTodo(id);
      ctx.response.body = { message: `Todo with id ${id} DELETED` };
    } catch (error) {
      console.error(error);
    }
  }
}