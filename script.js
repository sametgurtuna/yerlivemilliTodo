// Sayfa yüklendiğinde mevcut görevleri localStorage'den alıp ekrana ekleyen fonksiyon
window.onload = function () {
  var savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    var taskList = document.getElementById("taskList");
    savedTasks.forEach(function (taskText) {
      addTaskToDOM(taskText);
    });
  }
};

// Yeni görev eklemek için fonksiyon
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTaskToDOM(taskText);

    // Görevi localStorage'e kaydet
    saveTask(taskText);

    taskInput.value = "";
  } else {
    alert("Please enter a task!");
  }
}

// DOM'a görev eklemek için fonksiyon
function addTaskToDOM(taskText) {
  var taskList = document.getElementById("taskList");
  var li = document.createElement("li");
  li.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-button" onclick="deleteTask(this.parentNode)">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
  li.onclick = function () {
    toggleTask(this);
  };
  taskList.appendChild(li);
}

// Görevi localStorage'e kaydetmek için fonksiyon
function saveTask(taskText) {
  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Görevi tamamlamak için fonksiyon
function toggleTask(task) {
  task.classList.toggle("completed");
}

// Görevi silmek için fonksiyon
function deleteTask(task) {
  task.remove();
  updateLocalStorage();
}

// localStorage'deki görev listesini güncellemek için fonksiyon
function updateLocalStorage() {
  var tasks = [];
  var taskElements = document.querySelectorAll("#taskList li span");
  taskElements.forEach(function (taskElement) {
    tasks.push(taskElement.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
