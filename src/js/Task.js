export default class Task {
  constructor(taskname, pinned = false) {
    this.task = taskname;
    this.pinned = pinned;

    this.taskElement = document.createElement('li');
    const taskClass = this.pinned ? 'pin' : 'task';
    this.taskElement.classList.add(taskClass);
    this.taskElement.innerText = this.task;
  }
}
