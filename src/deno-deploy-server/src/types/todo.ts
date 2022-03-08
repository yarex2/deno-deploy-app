import { Bson } from "../database/mongodb.ts";

export interface Todo {
  id: string;
  message: string;
}

export interface Todo2 extends Todo {
  timestamp: number;
}

export interface TodoSchema {
  _id: Bson.ObjectId;
  id: string;
  message: string;
  timestamp: number;
}
