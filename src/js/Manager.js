import Task from './Task';

export default class Manager {
  constructor(element) {
    this.input = element.querySelector('.task_input');
    this.pinList = element.querySelector('.pin_list');
    this.taskList = element.querySelector('.task_list');
    this.tasks = [];

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.pinTask = this.pinTask.bind(this);
    this.filterTask = this.filterTask.bind(this);
  }

  init() {
    this.input.addEventListener('keyup', this.onKeyUp);
    this.input.closest('form').addEventListener('submit', this.onSubmit);
    this.taskList.addEventListener('click', this.pinTask);
    this.pinList.addEventListener('click', this.pinTask);

    this.showTaskList();
    this.showPinList();
  }

  onKeyUp() {
    this.showTaskList();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.input.value !== '') {
      this.addTask(this.input.value);
      this.input.value = '';
    } else {
      this.showError();
    }
  }

  addTask(taskname) {
    const newTask = new Task(taskname);
    this.tasks.push(newTask);
    this.showTaskList();
  }

  pinTask(event) {
    const taskToPin = event.target.closest('.task, .pin');
    if (taskToPin) {
      const task = this.tasks.find((item) => item.taskElement === taskToPin);
      task.pinned = !task.pinned;
      this.showPinList();
      this.showTaskList();
      task.taskElement.classList.toggle('task');
      task.taskElement.classList.toggle('pin');
    }
  }

  showPinList() {
    const taskItems = this.tasks.filter((item) => item.pinned === true);

    this.pinList.querySelectorAll('.pin, .empty').forEach((item) => item.remove());
    if (taskItems.length) {
      taskItems.forEach((item) => {
        this.pinList.appendChild(item.taskElement);
      });
    } else {
      const noElement = document.createElement('li');
      noElement.classList.add('empty');
      noElement.innerText = 'NO PINNED TASKS';
      this.pinList.appendChild(noElement);
    }
  }

  showTaskList() {
    let taskItems = this.tasks.filter((item) => item.pinned === false);
    if (this.input.value !== '') {
      taskItems = taskItems.filter(this.filterTask);
    }

    this.taskList.querySelectorAll('.task, .empty').forEach((item) => item.remove());
    if (taskItems.length) {
      taskItems.forEach((item) => {
        this.taskList.appendChild(item.taskElement);
      });
    } else {
      const noElement = document.createElement('li');
      noElement.classList.add('empty');
      noElement.innerText = 'NO TASKS FOUND';
      this.taskList.appendChild(noElement);
    }
  }

  showError() {
    if (!this.input.closest('form').querySelector('.error')) {
      const errorHTML = document.createElement('div');
      errorHTML.classList.add('error');
      errorHTML.innerText = 'Write Task Name!';
      this.input.after(errorHTML);
      setTimeout(() => errorHTML.remove(), 2000);
    }
  }

  filterTask(data) {
    const regexp = new RegExp(`^${this.input.value}`, 'i');
    return regexp.test(data.task);
  }
}
