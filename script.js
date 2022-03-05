let formInput = document.querySelector(".formInput");
let formBtn = document.querySelector(".formButton"); 
let taskList = document.querySelector(".tasksList");
let form = document.querySelector(".submitForm");
let myTask;
let tasks = [];
let storedTasks = [];

const addToLocalStorage = function (task, index) {
  storedTasks.push({ name: task, id: index });
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
};

const removeFromLocalStorage = function (id) {
    let newStoredTask = storedTasks.filter(
      (item) => item.id !== id
    );
    storedTasks = newStoredTask;
    localStorage.setItem("tasks", JSON.stringify(newStoredTask));
  };
  const addTask = function (task, index) {
    myTask = `<li id="task-${index}">
  <span class='taskContainer'>
  
  <span class="taskValue"> ${task} </span>
  <input class='editInput'/>
  <button class="edit" onclick="update(${index})"><i class="fas fa-pencil-alt"></i></button>
  <button class="delete" onclick="deleteTask(${index})" ><i class="fas fa-trash-alt"></i></button>
  </span>
  </li>
  `;
    taskList.innerHTML += myTask;
    tasks.push({ name: task, id: index });
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    if (formInput.value === "") return;
    let index = tasks.length;
    addTask(formInput.value, index);
    addToLocalStorage(formInput.value, index);
    taskNumber.innerText = tasks.length;
    formInput.value = "";
  });
  s
  const update = (index) => {
    let editBtn = document.getElementsByClassName("edit");
    let li = document.getElementById(`task-${index}`);
    let editInput = li.querySelector(".editInput");
    let spanBox = li.querySelector(".taskValue");
  
    if (li.classList.contains("editMode")) {
      editInput.style.display = "none";
      spanBox.style.display = "inlineBlock";
      let newTaskValue = editInput.value;
      spanBox.innerText = newTaskValue;
      li.classList.remove("editMode");
    } else {
      editInput.style.display = "inlineBlock";
      editInput.style.marginTop = "7px";
      spanBox.style.display = "none";
      editInput.value = spanBox.innerText;
      editInput.addEventListener("change", () => {
        let objectIndex = storedTasks.findIndex((i) => i.id == index);
        storedTasks[objectIndex].name = editInput.value;
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      });
      li.classList.add("editMode");
    }
  };
  
  
  function deleteTask(id) {
    
    let deletedELment = document.getElementById(`task-${id}`);
    let newTasks = tasks.filter((item) => item.id !== id);
    tasks = newTasks;
    let deletedTask = deletedELment.childNodes[1].childNodes[1];
    deletedELment.remove();
    removeFromLocalStorage(id);
    taskNumber.innerText = tasks.length;
  }
  
  document.querySelector(".deleteAll").addEventListener("click", deleteAll);
  function deleteAll() {
    document.querySelectorAll("ul li").forEach((ele) => {
      ele.remove();
    });
    storedTasks = [];
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    
  }
    
  let printedtasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks = printedtasks;
  printedtasks.forEach((ele) => {
    addTask(ele.name, ele.id);
  });
  