const fs = require('fs');
const path = require('path');

const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');

const tasksFilePath = path.join(__dirname, 'tasks.json');

function loadTasks() {
  if (fs.existsSync(tasksFilePath)) {
    const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
    const tasks = JSON.parse(tasksData);

    tasks.forEach(task => {
      addTaskToDOM(task.text, task.complete);
    });
  }
}

function saveTasks() {
  const tasks = [];
  todoList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      complete: li.classList.contains('complete')
    });
  });

  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

function addTaskToDOM(taskText, isComplete = false) {
  const li = document.createElement('li');
  const text = document.createTextNode(taskText);

  const doneBtn = document.createElement('button');
  doneBtn.textContent = "Done";
  doneBtn.classList.add('done-btn');

  if (isComplete) {
    li.classList.add('complete');
  }

  doneBtn.addEventListener('click', function () {
    li.remove();
    saveTasks();
  });

  li.appendChild(text);
  li.appendChild(doneBtn);
  todoList.appendChild(li);
}

addBtn.addEventListener('click', function () {
  const taskText = todoInput.value.trim();

  if (taskText) {
    addTaskToDOM(taskText);
    saveTasks();
    todoInput.value = "";
  } else {
    alert("Task cannot be empty!");
  }
});

loadTasks();
