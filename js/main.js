// Get the current year
const date = new Date();
let year = date.getFullYear();
const currentYear = document.getElementById("current-year");
currentYear.innerHTML = year;

document
  .querySelector(".navbar-hamburger")
  .addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("d-none");
  });

// Drag and drop
var dragging = null;

document.addEventListener("dragstart", function (event) {
  dragging = event.target;
  event.dataTransfer.setData("text/html", dragging);
});

document.addEventListener("dragover", function (event) {
  event.preventDefault();
});

document.addEventListener("dragenter", function (event) {
  event.target.style["border-bottom"] = "solid 2px #000";
});

document.addEventListener("dragleave", function (event) {
  event.target.style["border-bottom"] = "";
});

document.addEventListener("drop", function (event) {
  event.preventDefault();
  event.target.style["border-bottom"] = "";
  event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
});

// Add tasks
document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var taskName = document.getElementById("taskName").value;
    var assignee = document.getElementById("assignee").value;
    var taskStatus = document.getElementById("taskStatus").value;
    var dueDate = document.getElementById("dueDate").value;

    // Create new list item
    var newTaskItem = document.createElement("li");
    newTaskItem.setAttribute("draggable", true);
    newTaskItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newTaskItem.setAttribute(
      "data-taskid",
      "newTask" +
        (document.getElementById("taskList").getElementsByTagName("li").length +
          1)
    );
    newTaskItem.textContent =
      taskName + " - Assignee: " + assignee + " - Due Date: " + dueDate;

    var badgeSpan = document.createElement("span");
    badgeSpan.className = "badge " + getBadgeClass(taskStatus);
    badgeSpan.textContent = taskStatus;

    newTaskItem.appendChild(badgeSpan);

    document.getElementById("taskList").appendChild(newTaskItem);

    document.getElementById("taskName").value = "";
    document.getElementById("assignee").value = "";
    document.getElementById("taskStatus").value = "in-progress";
    document.getElementById("dueDate").value = "";

    renderTotalTasks();
    renderCompletedTasks();
    renderRemainingTasks();
  });

function getBadgeClass(status) {
  switch (status) {
    case "in-progress":
      return "badge-primary";
    case "completed":
      return "badge-success";
    case "pending":
      return "badge-danger";
    default:
      return "badge-secondary";
  }
}

renderTotalTasks();
renderCompletedTasks();
renderRemainingTasks();
function renderTotalTasks() {
  document.getElementById("totalTasks").innerText = taskList.childElementCount;
}

function renderCompletedTasks() {
  const completedTasksText = document.getElementById("completedTasks");
  const completedTasks = document.querySelectorAll("#taskList .badge-success");
  completedTasksText.innerText = completedTasks.length;
}

function renderRemainingTasks() {
  const remainingTasksText = document.getElementById("remainingTasks");
  const remainingTasks = document.querySelectorAll("#taskList .badge-danger");
  const remainingTasksInProgress = document.querySelectorAll(
    "#taskList .badge-primary"
  );
  remainingTasksText.innerText =
    remainingTasks.length + remainingTasksInProgress.length;
}
