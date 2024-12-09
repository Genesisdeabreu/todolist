let tasks = [
  { id: 1, description: "Comprar frutas", completed: false },
  { id: 2, description: "Estudiar para la prueba", completed: false },
  { id: 3, description: "Sacar a pasear a Timmy", completed: true },
];

const taskList = document.getElementById("task-list");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");


function renderTasks() {
  taskList.innerHTML = ""; 
  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.description}</td>
      <td>
        <input type="checkbox" class="complete-task" ${task.completed ? "checked" : ""}>
        <span class="delete-btn">✖</span>
      </td>
    `;
    row.querySelector(".complete-task").addEventListener("change", () => toggleComplete(task.id));
    row.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
    taskList.appendChild(row);
  });
  updateCounts();
}


document.getElementById("add-task").addEventListener("click", () => {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Escribe una tarea!");

  tasks.push({ id: tasks.length + 1, description: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
});


function toggleComplete(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  task.completed = !task.completed;
  renderTasks();
}


function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}


function updateCounts() {
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter((task) => task.completed).length;
}


renderTasks();
