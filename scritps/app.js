let saveBtn = document.getElementById("saveBtn");
let addNewTaskBtn = document.getElementById("addNewTaskBtn");
let toDoCol = document.getElementById("toDoCol");
let inProgressCol = document.getElementById("inProgressCol");
let completeCol = document.getElementById("completeCol");
let editTaskName = document.getElementById("editTaskName");
let editPriority = document.getElementById("editPriority");
let editDueDate = document.getElementById("editDueDate");
let editStatus = document.getElementById("editStatus");
let editModalElement = document.getElementById('editModal');
let descriptionName = document.getElementById("descriptionName");
let editDescription = document.getElementById("editDescription");
let editModal = document.getElementById("editModal")

saveBtn.addEventListener("click", () => {
    let taskNameValue = taskName.value;
    let descriptionValue = descriptionName.value;
    let priorityValue = priorityDropDown.value;
    let dueDateValue = dateCal.value;
    let statusValue = statusDropDown.value;

    createElem(taskNameValue, descriptionValue, priorityValue, dueDateValue, statusValue);

    saveLocal(taskNameValue, descriptionValue, priorityValue, dueDateValue, statusValue);

    taskName.value = "";
    descriptionName.value = "";
    priorityDropDown.value = "low";
    dateCal.value = "";
    statusDropDown.value = "toDo";
});
const createElem = (taskName, description, priority, dueDate, status) => {
    let div1 = document.createElement("div");
    div1.style.minWidth = "400px";
    div1.style.backgroundColor = "pink";
    div1.style.borderRadius = "10px";
    div1.style.padding = "20px";
    div1.style.marginBottom = "10px";

    let div2 = document.createElement("div");
    div2.classList.add("d-flex", "justify-content-between");

    let p1 = document.createElement("p");
    p1.innerText = taskName;

    let p2 = document.createElement("p");
    p2.innerText = "Due: " + dueDate;

    let p3 = document.createElement("p");
    p3.innerText = "Priority: " + priority;

    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("d-flex", "flex-column");

    let btnEdit = document.createElement("button");
    btnEdit.classList.add("mb-3");
    btnEdit.style.borderRadius = "10px";
    btnEdit.style.backgroundColor = "yellowgreen";
    btnEdit.innerText = "Edit";

    let removeButton = document.createElement("button");
    removeButton.style.borderRadius = "10px";
    removeButton.style.backgroundColor = "red";
    removeButton.innerText = "Remove";

    btnEdit.addEventListener("click", () => {
        editTaskName.value = p1.innerText;
        editPriority.value = priority;
        editStatus.value = status;
        editDescription.value = description;
        let dueDateText = p2.innerText.split('Due: ')[1];
        editDueDate.value = dueDateText;
        let editModal = new bootstrap.Modal(editModalElement);
        editModal.show();

        editSaveBtn.addEventListener("click", () => {
            p1.innerText = editTaskName.value;
            p3.innerText = "Priority: " + editPriority.value;
            p2.innerText = "Due: " + editDueDate.value;
            description = editDescription.value;
            let newStatus = editStatus.value;

            updateLocal(taskName, {
                taskName: editTaskName.value,
                description: editDescription.value,
                priority: editPriority.value,
                dueDate: editDueDate.value,
                status: newStatus
            });

            taskName = editTaskName.value;
            priority = editPriority.value;
            status = newStatus;
            dueDate = editDueDate.value;

            if (newStatus === "toDo") {
                toDoCol.appendChild(div1);
            } else if (newStatus === "inProgress") {
                inProgressCol.appendChild(div1);
            } else if (newStatus === "completed") {
                completeCol.appendChild(div1);
            }
            editModal.hide();
        });
    });
    removeButton.addEventListener("click", () => {
        removeLocal(taskName.innerText);
        div1.remove();
    });

    btnDiv.appendChild(btnEdit);
    btnDiv.appendChild(removeButton);
    div1.appendChild(div2);
    div1.appendChild(btnDiv);

    if (status === "toDo") {
        toDoCol.appendChild(div1);
    } else if (status === "inProgress") {
        inProgressCol.appendChild(div1);
    } else if (status === "completed") {
        completeCol.appendChild(div1);
    }
}
const saveLocal = (taskName, description, priority, dueDate, status) => {
    let tasks = getLocal()
    tasks.push({
        taskName: taskName,
        description: description,
        priority: priority,
        dueDate: dueDate,
        status: status
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
const updateLocal = (taskName, newData) => {
    let tasks = getLocal();
    let index = tasks.findIndex(task => task.taskName === taskName);
    tasks[index] = newData;
    localStorage.setItem('tasks', JSON.stringify(tasks));

};
const loadIt = () => {
    let tasks = getLocal()
    tasks.forEach((task) => {
        createElem(task.taskName, task.description, task.priority, task.dueDate, task.status);
    });
}

const removeLocal = (taskName) => {
    let tasks = getLocal();
    let index = tasks.indexOf(taskName);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getLocal = () => {
    let localStorageData = localStorage.getItem("tasks");
    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData)
}

loadIt();