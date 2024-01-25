// store/TodoStore.ts
import { makeAutoObservable } from 'mobx';
import { Todo }               from '@/store/domain/todo/model/Todo';

class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(completed: boolean, task: string, author: { id: string }) {
    const newTodo = new Todo(Date.now(), completed, task, author);
    this.todos.push(newTodo);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

export default new TodoStore();