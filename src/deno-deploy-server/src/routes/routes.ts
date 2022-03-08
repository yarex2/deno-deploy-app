import { Router } from "../deps.ts";

import { FirebaseTodosClient } from '../database/firebase.ts'
import { MongoDbTodosClient } from '../database/mongodb.ts'
import { Todo2 } from "../types/todo.ts"

const router = new Router();

router.get('/todos', async (ctx) => {
    const limit = parseInt(ctx.request.url.searchParams.get('limit') as string) || 10;
    const page =  parseInt(ctx.request.url.searchParams.get('page') as string) || 1;
    const offset = (page - 1) * limit;

    // const todos = await MongoDbTodosClient.getTodos(limit, page);
    const todos = await FirebaseTodosClient.getTodos(limit, page);
    
    ctx.response.body = { todos: todos };
});

router.post('/todos', async (ctx) => {
    const data = await ctx.request.body({ type: "json" }).value;
    const todo: Todo2 = { 
        id: crypto.randomUUID(),
        message: data.message,
        timestamp: Date.now(),
    };

    // const _id = await MongoDbTodosClient.createTodo(todo);
    const _id = await FirebaseTodosClient.createTodo(todo);

    ctx.response.body = { message: `Todo with id ${todo.id} CREATED`, todo };
});

router.put('/todos/:id', async (ctx) => {
    const id = ctx.params.id!;
    const data = await ctx.request.body({ type: "json" }).value;

    // await MongoDbTodosClient.updateTodo(id, data.message);
    await FirebaseTodosClient.updateTodo(id, data.message);

    ctx.response.body = { message: `Todo with id ${id} UPDATED` };
});

router.delete('/todos/:id', async (ctx) => {
    const id = ctx.params.id!;

    // await MongoDbTodosClient.deleteTodo(id);
    await FirebaseTodosClient.deleteTodo(id);

    ctx.response.body = { message: `Todo with id ${id} DELETED` };
});

export default router;
