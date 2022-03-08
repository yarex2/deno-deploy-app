
const dbUrl = "mongodb://localhost:27017"
// const dbUrl = Deno.env.get("MONGODB_URL")!;

import { MongoClient, Database } from "https://deno.land/x/mongo@v0.29.2/mod.ts";
import { Todo2, TodoSchema } from "../types/todo.ts";

// export { Bson } from "mongo";
export { Bson } from "https://deno.land/x/mongo@v0.29.2/mod.ts";

export class MongoDbTodosClient {
    db: Database;

    static async connect() {
        const client = new MongoClient();
        await client.connect(dbUrl);

        this.db = client.database("todos");
    }

    static getDb() {
        return this.db;
    }

    static async getTodos(limit: number, offset: number) {
        const todos = await this.getDb().collection<TodoSchema>('todos').find().sort({ timestamp: -1 }).limit(limit).skip(offset);
        const jsonTodos = await todos.map((todo: TodoSchema) => {
            const { id, message } = todo;
            return { id, message };
        });

        return jsonTodos;
    }

    static async createTodo(todo: Todo2) {
        return await this.getDb().collection<TodoSchema>('todos').insertOne(todo);
    }

    static async updateTodo(id: string, message: string) {
        await this.getDb().collection<TodoSchema>('todos').updateOne(
            { id },
            { $set: { message } },
        );
    }

    static async deleteTodo(id: string) {
        await this.getDb().collection<TodoSchema>('todos').deleteOne(
            { id },
        );
    }
}
