let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array to store tasks
let arrayOfTasks = [];

// check if there is tasks in local storage

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage();
// Add Task 

submit.addEventListener("click", function() {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add task To array Tasks
        input.value = ""; // Empty Input Field
    }
})

// Click On task Element

tasksDiv.addEventListener("click", (e)=>{
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Element from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element from page
        e.target.parentElement.remove();
    }

    // Task Element
    if (e.target.classList.contains("task")) {

        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle done class
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText) {
    // Task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    //Push task to array to tasks
    arrayOfTasks.push(task);

    // Add tasks to page
    addElementToPageFrom(arrayOfTasks);

    // Add Tasks To local storage
    addDataToLocalStorageFrom(arrayOfTasks);

    // For Testing
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));
}

function addElementToPageFrom(arrayOfTasks) {
    // EMpty the task div
    tasksDiv.innerHTML = "";
    //Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        //check if task i done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        // add task div to tasks div

        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks)
    }
}


function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for(let i = 0; i<arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}