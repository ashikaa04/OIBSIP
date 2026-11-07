// DAYLIGHT — Vanilla JavaScript To-do App
// Tasks are stored in localStorage so they remain after refreshing the page.

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "daylight-tasks-v1";
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const pendingList = document.getElementById("pending-list");
  const completedList = document.getElementById("completed-list");
  const pendingCount = document.getElementById("pending-count");
  const completedCount = document.getElementById("completed-count");
  const pendingEmpty = document.getElementById("pending-empty");
  const completedEmpty = document.getElementById("completed-empty");
  const progressFill = document.getElementById("progress-fill");
  const progressCount = document.getElementById("progress-count");
  const progressPercent = document.getElementById("progress-percent");
  const progressMessage = document.getElementById("progress-message");
  const totalLabel = document.getElementById("task-total");
  const toast = document.getElementById("toast");

  let tasks = loadTasks();
  let toastTimer;

  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      console.warn("Could not read saved tasks:", error);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      showToast("Could not save tasks in this browser.");
      console.error("Could not save tasks:", error);
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function formatDate(timestamp) {
    return new Intl.DateTimeFormat(undefined, {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
    }).format(new Date(timestamp));
  }

  function createId() {
    return (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function addTask(text) {
    tasks.unshift({
      id: createId(),
      text,
      completed: false,
      createdAt: Date.now(),
      completedAt: null
    });
    saveTasks();
    render();
    showToast("Task added to your list.");
  }

  function toggleTask(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;
    task.completed = !task.completed;
    task.completedAt = task.completed ? Date.now() : null;
    saveTasks();
    render();
    showToast(task.completed ? "Nicely done — task completed!" : "Task moved back to pending.");
  }

  function deleteTask(id) {
    tasks = tasks.filter(item => item.id !== id);
    saveTasks();
    render();
    showToast("Task deleted.");
  }

  function editTask(id, newText) {
    const task = tasks.find(item => item.id === id);
    const cleaned = newText.trim();
    if (!task || !cleaned) {
      render();
      return;
    }
    task.text = cleaned;
    saveTasks();
    render();
    showToast("Task updated.");
  }

  function makeTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";

    const check = document.createElement("button");
    check.className = "task-check";
    check.type = "button";
    check.setAttribute("aria-label", task.completed ? "Move task to pending" : "Mark task complete");
    check.textContent = task.completed ? "✓" : "";
    check.addEventListener("click", () => toggleTask(task.id));

    const main = document.createElement("div");
    main.className = "task-main";

    const text = document.createElement("p");
    text.className = "task-text";
    text.textContent = task.text;

    const time = document.createElement("time");
    time.className = "task-time";
    time.dateTime = new Date(task.createdAt).toISOString();
    time.textContent = `Added ${formatDate(task.createdAt)}`;
    if (task.completed && task.completedAt) {
      time.textContent += ` · Completed ${formatDate(task.completedAt)}`;
    }
    main.append(text, time);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (!task.completed) {
      const edit = document.createElement("button");
      edit.className = "icon-button";
      edit.type = "button";
      edit.textContent = "✎";
      edit.title = "Edit task";
      edit.setAttribute("aria-label", `Edit ${task.text}`);
      edit.addEventListener("click", () => beginEdit(task, li));
      actions.append(edit);
    }

    const remove = document.createElement("button");
    remove.className = "icon-button delete";
    remove.type = "button";
    remove.textContent = "×";
    remove.title = "Delete task";
    remove.setAttribute("aria-label", `Delete ${task.text}`);
    remove.addEventListener("click", () => deleteTask(task.id));
    actions.append(remove);

    li.append(check, main, actions);
    return li;
  }

  function beginEdit(task, listItem) {
    const main = listItem.querySelector(".task-main");
    const oldText = task.text;
    const editor = document.createElement("input");
    editor.className = "edit-input";
    editor.type = "text";
    editor.maxLength = 120;
    editor.value = oldText;
    editor.setAttribute("aria-label", "Edit task text");
    main.replaceChildren(editor);
    editor.focus();
    editor.select();

    let finished = false;
    function finish(save) {
      if (finished) return;
      finished = true;
      if (save) editTask(task.id, editor.value);
      else render();
    }
    editor.addEventListener("keydown", event => {
      if (event.key === "Enter") finish(true);
      if (event.key === "Escape") finish(false);
    });
    editor.addEventListener("blur", () => finish(true));
  }

  function render() {
    pendingList.replaceChildren();
    completedList.replaceChildren();

    const pending = tasks.filter(task => !task.completed);
    const completed = tasks.filter(task => task.completed);

    pending.forEach(task => pendingList.append(makeTaskElement(task)));
    completed.forEach(task => completedList.append(makeTaskElement(task)));

    pendingCount.textContent = `${pending.length} pending`;
    completedCount.textContent = `${completed.length} completed`;
    pendingEmpty.hidden = pending.length > 0;
    completedEmpty.hidden = completed.length > 0;

    const total = tasks.length;
    const percent = total ? Math.round((completed.length / total) * 100) : 0;
    progressFill.style.width = `${percent}%`;
    progressCount.textContent = `${completed.length} of ${total} completed`;
    progressPercent.textContent = `${percent}%`;
    progressMessage.textContent = total === 0
      ? "A fresh start."
      : percent === 100
        ? "Look at you — everything is done!"
        : percent >= 50
          ? "You're making lovely progress."
          : "Every small step counts.";
    totalLabel.textContent = `${total} ${total === 1 ? "task" : "tasks"} in your list`;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      showToast("Type a task before adding it.");
      input.focus();
      return;
    }
    addTask(value);
    input.value = "";
    input.focus();
  });

  document.getElementById("today-label").textContent =
    new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" })
      .format(new Date()).toUpperCase();

  render();
});
