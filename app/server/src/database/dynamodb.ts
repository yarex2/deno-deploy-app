import {
  DynamoDBClient,
  DeleteItemCommand,
  DeleteItemCommandInput,
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  // QueryCommand,
  // QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemOutput,
} 
// from "https://cdn.skypack.dev/@aws-sdk/client-dynamodb?dts";
from "https://deno.land/x/aws_sdk@v3.32.0-1/client-dynamodb/mod.ts";

import { CreateTodoDto } from '../types/dto/createTodoDto.ts';
import { FilterGetTodos } from '../types/dto/filterGetTodos.ts';
import { UpdateTodoDto } from '../types/dto/updateTodoDto.ts';

import { Todo } from '../types/todo.ts';

const TABLE_NAME = 'Todos';

interface TodoItem {
  id: {
    S: string;
  };
  message: {
    S: string;
  };
}

export class DynamoDbTodosClient {
  private client: DynamoDBClient;
  constructor(
    private readonly accessKeyId: string,
    private readonly secretAccessKey: string,
    private readonly region: string,
  ) {
    this.client = new DynamoDBClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async getTodos(filterGetTodos: FilterGetTodos): Promise<Todo[]> {
    // const input: QueryCommandInput = {
    //   TableName: "Todos",
    //   AttributesToGet: ['id', 'message'],
    // };
    // const command = new QueryCommand(input);

    const input: ScanCommandInput = {
      TableName: TABLE_NAME,
      AttributesToGet: ['id', 'message'],
    };
    const command = new ScanCommand(input);

    try {
      let { Items, Count } = await this.client.send(command);

      // @ts-ignore
      const todos = Items!.map(item => this.mapItemToTodo(item));

      return todos;
    } catch (error) {
      throw error;
    }
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { id, message, timestamp } = createTodoDto;

    const input: PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: {
        // S: String, N: Number
        id: { S: id },
        message: { S: message },
        timestamp: { N: timestamp.toString() },
      },
    };
    const command = new PutItemCommand(input);

    try {
      const {
        $metadata: { httpStatusCode },
      } = await this.client.send(command);

      return createTodoDto;
    } catch (error) {
      throw error;
    }
  }


  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id, message } = updateTodoDto;

    const input: UpdateItemCommandInput = {
      TableName: TABLE_NAME,
      Key: { id: { S: id } },
      UpdateExpression: "SET message = :m",
      ExpressionAttributeValues: {
        ":m": { S: message },
      },
      ReturnValues: "ALL_NEW",
    };
    const command = new UpdateItemCommand(input);

    try {
      const {
        $metadata: { httpStatusCode },
        Attributes,
      } = await this.client.send(command);

      // @ts-ignore
      const todo = this.mapItemToTodo(Attributes);

      return todo;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const input: DeleteItemCommandInput = {
      TableName: TABLE_NAME,
      Key: { id: { S: id } },
    };
    const command = new DeleteItemCommand(input);

    try {
      const {
        $metadata: { httpStatusCode },
      } = await this.client.send(command);
    } catch (error) {
      throw error;
    }
  }

  protected mapItemToTodo(attributeValues: TodoItem): Todo {
    const todo: Todo = {};
    todo.id = attributeValues.id.S;
    todo.message = attributeValues.message.S;

    return todo;
  }

}