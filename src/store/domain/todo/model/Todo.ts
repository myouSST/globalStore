import { makeAutoObservable, reaction } from "mobx";

export class Todo {
  id = 0;
  completed = false
  task = ""
  author = { id: '' }
  autoSave = true
  saveHandler: any = null

  constructor(id: number, completed: boolean, task: string, author:{ id: string }) {
    makeAutoObservable(this, {
      id: false,
      autoSave: false,
      saveHandler: false,
      dispose: false
    })
    this.id = id
    this.completed = completed;
    this.task = task;
    this.author = author;

    this.saveHandler = reaction(
      () => this.asJson,
      json => {
        console.log(json);
        if (this.autoSave) {
          // this.store.transportLayer.saveTodo(json)
        }
      }
    )
  }

  get asJson() {
    return {
      id: this.id,
      completed: this.completed,
      task: this.task,
      authorId: this.author ? this.author.id : null
    }
  }

  updateFromJson(json: any) {
    this.autoSave = false // 변경 사항을 서버로 다시 보내는 것을 방지합니다.
    this.completed = json.completed
    this.task = json.task
    this.autoSave = true
  }

  dispose() {
    this.saveHandler()
  }
}