// XMLHttpRequest and localStorage polyfills
import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
installGlobals();
export { virtualStorage } from "https://deno.land/x/virtualstorage@0.1.0/middleware.ts";

// web libraries for Firebase
import firebase from "https://cdn.skypack.dev/firebase@8.7.0/app";
import "https://cdn.skypack.dev/firebase@8.7.0/auth";
import "https://cdn.skypack.dev/firebase@8.7.0/firestore";

import { Todo2 } from "../types/todo.ts"

// Firebase setup
const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
const firebaseApp = firebase.initializeApp(firebaseConfig, "example");

export const firebaseAuth = firebase.auth(firebaseApp);
export const firebaseDb = firebase.firestore(firebaseApp);

export class FirebaseTodosClient {
  static async getTodos(limit: number, offset: number) {
    const querySnapshot = await firebaseDb.collection("todos").get();
    const todos = querySnapshot.docs.map((doc) => doc.data());
    return todos;
  }

  static async createTodo(todo: Todo2) {
    return await firebaseDb.collection("todos").add(todo);
  }

  static async updateTodo(id: string, message: string) {
    const querySnapshot = await firebaseDb
      .collection("todos")
      .where("id", "==", id)
      .get();
      
    await Promise.all(querySnapshot.docs.map(
      (doc) => doc.ref.update({ message })
    ));
  }

  static async deleteTodo(id: string) {
    const querySnapshot = await firebaseDb
      .collection("todos")
      .where("id", "==", id)
      .get();
      
    await Promise.all(querySnapshot.docs.map((doc) => doc.ref.delete()));
  }
}
