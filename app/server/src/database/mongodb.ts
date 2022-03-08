import { MongoClient, Database } from "https://deno.land/x/mongo@v0.29.2/mod.ts";

// import { Bson } from "mongo";
import { Bson } from "https://deno.land/x/mongo@v0.29.2/mod.ts";

import { CreateTodoDto } from '../types/dto/createTodoDto.ts';
import { FilterGetTodos } from '../types/dto/filterGetTodos.ts';
import { UpdateTodoDto } from '../types/dto/updateTodoDto.ts';

import { Todo } from '../types/todo.ts';

export interface TodoSchema {
    _id: Bson.ObjectId;
    id: string;
    message: string;
    timestamp: number;
}

export class MongoDbTodosClient {
    db: Database;

    constructor(
        private dbUrl: string,
    ) {
    }

    async connect() {
        const client = new MongoClient();
        await client.connect(this.dbUrl);

        this.db = client.database("todos");
    }

    async getDb() {
        await this.connect();
        return this.db;
    }

    async getTodos(filterGetTodos: FilterGetTodos): Promise<Todo[]> {
        const { limit, offset } = filterGetTodos;

        try {
            const todos = await (await this.getDb()).collection<TodoSchema>('todos').find().sort({ timestamp: -1 }).limit(limit).skip(offset);
            const jsonTodos = await todos.map((todo: TodoSchema) => {
                const { id, message } = todo;
                return { id, message };
            });

            return jsonTodos;
        } catch (error) {
            throw error;
        }
    }

    async createTodo(todo: CreateTodoDto): Promise<Todo> {
        try {
            const id = await (await this.getDb()).collection<TodoSchema>('todos').insertOne(todo);
            const createdTodo = await (await this.getDb()).collection<TodoSchema>('todos').findOne({ _id: id }) as Todo;

            return createdTodo;
        } catch (error) {
            throw error;
        }
    }

    async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const { id, message } = updateTodoDto;

        try {
            await (await this.getDb()).collection<TodoSchema>('todos').updateOne(
                { id },
                { $set: { message } },
            );
            const updatedTodo = await (await this.getDb()).collection<TodoSchema>('todos').findOne({ id }) as Todo;

            return updatedTodo;
        } catch (error) {
            throw error;
        }
    }

    async deleteTodo(id: string): Promise<void> {
        try {
            await (await this.getDb()).collection<TodoSchema>('todos').deleteOne(
                { id },
            );
        } catch (error) {
            throw error;
        }
    }
}
