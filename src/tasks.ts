const taskForm = document.querySelector<HTMLFormElement>(".form")!;
const taskInput = document.querySelector<HTMLInputElement>(".form-input")!;

const taskListElement = document.querySelector<HTMLUListElement>(".list")!;

type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = loadTasks();

tasks.forEach((task) => renderTasks(task));

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = taskInput.value;
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };

    // add a new task to the list
    addtask(task);
    // render tasks
    renderTasks(task);
    // update local storage
    updateLocalStorage();

    taskInput.value = "";
    return;
  }
  alert("Please enter a task description");
});

function addtask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

function renderTasks(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;

  // checkbox for task completion
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  // toggle task completion checkbox
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateLocalStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement.appendChild(taskElement);
}

function updateLocalStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
