const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

//to be called upon clicking enter button
form.addEventListener("submit", (e) => {
    e.preventDefault(); //dont submit automatically

    addTodo();
});

function addTodo(todo) {
    //get value from input field
    let todoText = input.value;

    //get value from LS
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");

        if (todo && todo.completed) {
            //console.log("--" + todo.completed)
            todo.classList.add("completed");
        }

        todoEl.innerHTML = todoText;

        //click to toggle between completed and not completed
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        });

        //right click to delete
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = ""; //clear input filed

        updateLS();
    }
}

//update local storage
function updateLS() {
    const todosEl = document.querySelectorAll("li");
    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}