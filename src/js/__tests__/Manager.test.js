import Manager from '../Manager';
import Task from '../Task';

test('init', () => {
  const html = document.createElement('div');
  html.innerHTML = `<section class="taskmanager">
    <form>
      <input type="text" class="task_input">
    </form>
    <ul class="pin_list">
    </ul>
    <ul class="task_list">
    </ul>
  </section>`;
  const taskManager = new Manager(html.querySelector('.taskmanager'));

  taskManager.init();
  expect(html.querySelector('.pin_list .empty')).not.toBeFalsy();
  expect(html.querySelector('.task_list .empty')).not.toBeFalsy();
});

test('addTask', () => {
  const html = document.createElement('div');
  html.innerHTML = `<section class="taskmanager">
    <form>
      <input type="text" class="task_input">
    </form>
    <ul class="pin_list">
    </ul>
    <ul class="task_list">
    </ul>
  </section>`;
  const taskManager = new Manager(html.querySelector('.taskmanager'));

  taskManager.init();
  expect(taskManager.tasks.length).toBe(0);
  taskManager.addTask('Test');
  const testTask = new Task('Test');
  expect(taskManager.tasks).toEqual([testTask]);
});

test('onSubmit', () => {
  const html = document.createElement('div');
  html.innerHTML = `<section class="taskmanager">
    <form>
      <input type="text" class="task_input">
    </form>
    <ul class="pin_list">
    </ul>
    <ul class="task_list">
    </ul>
  </section>`;
  const taskManager = new Manager(html.querySelector('.taskmanager'));

  taskManager.init();

  const eventMock = { preventDefault() {} };
  taskManager.input.value = '';
  taskManager.onSubmit(eventMock);
  expect(html.querySelector('form .error')).not.toBeFalsy();
  expect(taskManager.tasks.length).toBe(0);

  taskManager.input.value = 'Test';
  taskManager.onSubmit(eventMock);
  const testTask = new Task('Test');
  expect(taskManager.tasks).toEqual([testTask]);
});

test('onKeyUp', () => {
  const html = document.createElement('div');
  html.innerHTML = `<section class="taskmanager">
    <form>
      <input type="text" class="task_input">
    </form>
    <ul class="pin_list">
    </ul>
    <ul class="task_list">
    </ul>
  </section>`;
  const taskManager = new Manager(html.querySelector('.taskmanager'));

  taskManager.tasks = [new Task('Test'), new Task('Example'), new Task('Item')];
  taskManager.init();
  expect(taskManager.taskList.querySelectorAll('li').length).toBe(3);
  taskManager.input.value = 'Te';
  taskManager.onKeyUp();
  expect(taskManager.taskList.querySelectorAll('li').length).toBe(1);
  expect(taskManager.taskList.querySelector('li').innerText).toBe('Test');
});

test('pinTask', () => {
  const html = document.createElement('div');
  html.innerHTML = `<section class="taskmanager">
    <form>
      <input type="text" class="task_input">
    </form>
    <ul class="pin_list">
    </ul>
    <ul class="task_list">
    </ul>
  </section>`;
  const taskManager = new Manager(html.querySelector('.taskmanager'));

  taskManager.init();

  const testTask = new Task('Test');
  const eventMock = { target: testTask.taskElement };
  taskManager.tasks.push(testTask);
  expect(testTask.pinned).toBeFalsy();
  expect(testTask.taskElement.classList.contains('task')).toBeTruthy();
  taskManager.pinTask(eventMock);
  expect(testTask.pinned).toBeTruthy();
  expect(testTask.taskElement.classList.contains('pin')).toBeTruthy();
});
