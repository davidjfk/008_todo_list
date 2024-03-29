/* list of functionalities:

deleteAllChildNodes
deleteOneChildNode

showTasksWhenOpeningTodolistApp

getNewTask (is a button in the UI)
transformTaskIntoObj

deleteAllTasksFromDOM (is a button in the UI)
*/


const deleteAllChildNodes = parent => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  
  const deleteOneChildNode = (parent, child) => {
    parent.removeChild(child)
  }
  
  const log = console.log;


const showTasksWhenOpeningTodolistApp = async function () {

    const receivedArrWithToDoListItemsFromLocalApi = await getAllTasksFromLocalApi(BASE_URL);
        
    const checkCorrectnessOfTodolistItemsFromLocalApi = (array) => {
        const arrLength = receivedArrWithToDoListItemsFromLocalApi.length;
        for (let i = 0; i < arrLength; i++) {
            if (![true, false].includes(array[i].done) || array[i]._id === "") {
                console.error(`Todolist item(s) have  not been added to  local-api correctly.  Reproduce error: 1. enter task and click 'add'. 2. repeat step 1. `)
            }
        }
    }
    checkCorrectnessOfTodolistItemsFromLocalApi(receivedArrWithToDoListItemsFromLocalApi);

    if (receivedArrWithToDoListItemsFromLocalApi) {
        const todoList = document.querySelector('#todo-list');
        deleteAllChildNodes(todoList);
    }
    receivedArrWithToDoListItemsFromLocalApi.map((arrObjTask) => addTaskToDOM(arrObjTask));

}
showTasksWhenOpeningTodolistApp()
// pitfall: load view.js into index.html before utils.js, otherwise the function showTasksWhenOpeningTodolistApp() will not be defined yet.


const getNewTask = () => {
    const newTask = document.getElementById("new-task").value;
    document.getElementById("new-task").value = "";
    return newTask;
}
const buttonAddTask = document.querySelector(".add-task");



const transformTaskIntoObj = () => {
    const newTaskAsString = getNewTask()
    if (newTaskAsString.length === 0) {
            alert('Please enter todo-list task.')
    } else {      
        const newTaskAsObj = { description: newTaskAsString, done: false };
        addTaskMainFn(newTaskAsObj)
    }     
}
buttonAddTask.addEventListener("click", transformTaskIntoObj) 



const deleteAllTasksFromDOM = async () => {
    // the API dictates that tasks must be deleted one-by-one.
    const elemToDoListWithHtmlCollection = document.getElementsByClassName("todo-list");
    const arrayWithToDoListItems = Array.from(elemToDoListWithHtmlCollection);
    const arrLength = Array.from(arrayWithToDoListItems[0].children).length;
    const elemToDoList = document.getElementById('todo-list')
    elemToDoList.style.display = "none";

    const deleteAllTasksInLocalApi = async (array, arrLength) => {
        for (let i = 0; i < arrLength; i++) {           
            try {
                const idOfTaskToDelete = array[0].children[i].className;
                const endpoint = `${BASE_URL}${idOfTaskToDelete}`
                const responseObj = await deleteTask(endpoint);
                log(`responsObj.status from local-api about last deleted task: ${responseObj.status}`)
                if (responseObj.status !== 204) {
                    console.error(`There is a problem deleting all tasks in one batch. Reproduce error: 
                    1. add 5 tasks to todo-list. 2) click button Delete All Tasks`)
                }
                log(`number of tasks (left) to delete: ${arrLength - i -1}`)
            } catch (e) {
                log(e);
            }           
        } 
    }
    const resultOfDeletingTasks = await deleteAllTasksInLocalApi(arrayWithToDoListItems, arrLength)

    if (resultOfDeletingTasks !== undefined) {
        log(`In local-api the method to delete tasks has changed. Please check.`)
    }
    
    // temp to show data in DOM that must be refreshed by api-call.
    elemToDoList.style.display = "block";

    // get empty local api and overwrite DOM (view), so the local api (model) acts as the single source of truth. 
    const todoListItemsFromLocalApi = await getAllTasksFromLocalApi(BASE_URL);
    if (todoListItemsFromLocalApi.length === 0) {
        const todoList = document.querySelector('#todo-list');
            deleteAllChildNodes(todoList);
    } else {
        todoListItemsFromLocalApi.map((arrObjTask) => addTaskToDOM(arrObjTask)); 
        console.error(`Deleting all items in (and thus) from local-api has failed. Reproduce bug: step 1: add few (e.g. 5 tasks to todo-list. step 2: click button 'Delete All Tasks')`)
    }

} 
const buttonDeleteAllTasks = document.querySelector(".delete-all-tasks");
buttonDeleteAllTasks.addEventListener("click", deleteAllTasksFromDOM)






