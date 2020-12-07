var validation = new Validation();
var taskList = new TaskList();
var todoList = new TaskList();
var completedList = new TaskList();



getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

getEle('addItem').addEventListener('click', function () {
    var _id = Math.random();
    var _tittle = getEle('newTask').value;
    var _status = 'todo';

    var _task = new Task(_id, _tittle, _status);


    var checkEmpty = validation.isEmpty(_tittle);
    if (!checkEmpty) return;

    var checkNameSake = validation.isNameSake(_tittle, taskList.arr);
    if (!checkNameSake) return;

    taskList.addTask(_task);
    createList(taskList.arr);
    setLocalStorage();

    getEle('newTask').value = '';
})

getEle('newTask').addEventListener('keypress', function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        getEle('addItem').click();
      }
})

function addTask(item) {
    var content = '';
    content += `
        <li>
            <span id="tittle"> ${item.tittle} </span>

            <div class="buttons">
                <button class="remove" onclick="deleteTask('${item.id}')">
                    <i class="fa fa-trash-alt"></i>
                </button>
                
                <button class="complete" onclick="changeStatus('${item.id}')">
                 <i class="far fa-check-circle" style = "font-size: 1rem" id></i>
                    <i class="fas fa-check-circle" style="color: #25b99a; font-size: 1rem;"></i>
                </button>
            </div>
        </li>
        `

    return content;
}

function createList(arr) {

    var contentTodo = '';
    var contentCompleted = '';
    
    todoList.arr = arr.filter(function (item) {
        return item.status === 'todo';
    })

    
    if(todoList.arr.length === 0)
    {
        getEle('todo').innerHTML = '';
    }
    else{
        todoList.arr.map(function (item) {
        
            contentTodo += addTask(item);
            getEle('todo').innerHTML = contentTodo;
           
        })
    }


    completedList.arr = arr.filter(function (item) {
        return item.status === 'completed';
    })

    if(completedList.arr.length === 0)
    {
        getEle('completed').innerHTML = "";
    }
    else{
        completedList.arr.map(function(item){
        
            contentCompleted += addTask(item);
            getEle('completed').innerHTML = contentCompleted;
         
        })
    }
    
    setLocalStorage();
}

function deleteTask(_id) {

    taskList.deleteTask(_id);
    createList(taskList.arr);
    setLocalStorage();

}

function changeStatus(_id) {

    var task = taskList.getTaskById(_id);
    taskList.updateTask(task.id);
    setLocalStorage();
    createList(taskList.arr);
}


function getLocalStorage() {

    if (localStorage.getItem('TaskList')) {
        taskList.arr = JSON.parse(localStorage.getItem('TaskList'));
        createList(taskList.arr);
    } 

}

function setLocalStorage() {

    localStorage.setItem('TaskList', JSON.stringify(taskList.arr))
    localStorage.setItem('TodoList', JSON.stringify(todoList.arr))
    localStorage.setItem('CompletedList', JSON.stringify(completedList.arr))
}