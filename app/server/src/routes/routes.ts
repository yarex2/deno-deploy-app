import { Router } from "../deps.ts";

import { TodosController } from '../controllers/todosController.ts'
import { Databases } from '../types/enums/databases.ts';

import { DynamoDbTodosClient } from '../database/dynamodb.ts';
import { FaunaDbTodosClient } from '../database/faunadb.ts';
// import { FirebaseTodosClient } from '../database/firebase.ts';
import { MongoDbTodosClient } from '../database/mongodb.ts';

const DATABASE = Deno.env.get("DATABASE")!;

let todosController = null;
switch (DATABASE) {
  case Databases.DynamoDb:
    const AWS_ACCESS_KEY_ID = Deno.env.get("AWS_ACCESS_KEY_ID")!;
    const AWS_SECRET_ACCESS_KEY = Deno.env.get("AWS_SECRET_ACCESS_KEY")!;
    const AWS_REGION = Deno.env.get("AWS_REGION")!;
    
    todosController = new TodosController(new DynamoDbTodosClient(
      AWS_ACCESS_KEY_ID, 
      AWS_SECRET_ACCESS_KEY,
      AWS_REGION,
    ));
    break;
  case Databases.FaunaDb:
    const FAUNA_SECRET = Deno.env.get("FAUNA_SECRET")!;
    const FAUNA_URL = Deno.env.get("FAUNA_URL")!;
    todosController = new TodosController(new FaunaDbTodosClient(FAUNA_SECRET, FAUNA_URL));
    break;
  case Databases.FirebaseDb:
    break;
  case Databases.MongoDb:
    const MONGODB_URL = Deno.env.get("MONGODB_URL")!;
    todosController = new TodosController(new MongoDbTodosClient(MONGODB_URL));
    break;
  default:
    console.log('Database not specified');
    Deno.exit(1);
}

const router = new Router();

//
// TODO: Use a DI library
// and move to a boostrap file or something similar
//

router.get('/todos', todosController.getTodos.bind(todosController));
router.post('/todos', todosController.createTodo.bind(todosController));
router.put('/todos/:id', todosController.updateTodo.bind(todosController));
router.delete('/todos/:id', todosController.deleteTodo.bind(todosController));

export default router;
