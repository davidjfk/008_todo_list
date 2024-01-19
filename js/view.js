const getDescriptionOfToDoListTask =  function (arrObjTask) {
    return arrObjTask.description;
}


const addTaskToDOM = async function (arrObjTask) {
    /* 
    when new task is entered in input field, then during fast-upate of UI, the arrObjTask_id is yet unknown. The DOM will display '<span class='undefined'></span>
    This does not affect rendering the rest of the DOM. 

    After the new task is added to the local api, the tasks are fetched from the local api, including the "missing" arrObjTask_id. The arrObjTask_id will now be displayed.
     */

    const todoList = document.querySelector('.todo-list');
    const todolistItem = document.createElement('li');
    todolistItem.classList.add(`${arrObjTask._id}`);
    todolistItem.id = arrObjTask._id;

    const checkboxTaskDone = document.createElement("input")
    checkboxTaskDone.type = "checkbox";
    checkboxTaskDone.name = "task-done";
    checkboxTaskDone.value = "task-done";
    checkboxTaskDone.id = `task-done${arrObjTask._id}`;
    checkboxTaskDone.classList.add('checkbox-task-done');
 
    const task = document.createElement('span');
    task.id = `task-on-todo-list${arrObjTask._id}`;
    task.classList.add('task-on-todo-list');
    task.tabIndex = 0;
    const todoListTaskDescription = getDescriptionOfToDoListTask(arrObjTask);
    const textElem = document.createTextNode(todoListTaskDescription);
    
    const iconDeleteTask = document.createElement("i")
    iconDeleteTask.id = `delete${arrObjTask._id}`;
    iconDeleteTask.classList.add('far');
    iconDeleteTask.classList.add('fa-trash-alt');
    iconDeleteTask.tabIndex = 0;

    todolistItem.appendChild(checkboxTaskDone);
    todolistItem.appendChild(textElem);
    task.appendChild(textElem);
    todolistItem.appendChild(task);
    todolistItem.appendChild(iconDeleteTask);
    todoList.appendChild(todolistItem);

    if (arrObjTask.done) {
        checkboxTaskDone.checked = true;
        document.getElementById(task.id).style.textDecoration = "line-through";
    } else {
        document.getElementById(task.id).style.textDecoration = "none";
    }


    const toggleTaskBetweenDoneAndNotDone = async (e) => {
        if (e.target.checked) {
            checkboxTaskDone.checked = true;
            document.getElementById(task.id).style.textDecoration = "line-through";

        } else {
            checkboxTaskDone.checked = false;
            document.getElementById(task.id).style.textDecoration = "none";
        }   

        const todolistItemId = (`${e.target.parentNode.className}`)
        const endpoint = `${BASE_URL}${todolistItemId}`

        const getUpdatedTask = () => {
            const updatedTask = document.getElementById(task.id).innerText;
            return updatedTask;
        }
        
        const getUpdatedStatusOfPropDone = () => {
            return checkboxTaskDone.checked;
        }
        

        const transformUpdatedTaskStringIntoObj = () => {      
            const updatedTaskAsString = getUpdatedTask()
            if (updatedTaskAsString.length < 0) {
                alert('Please enter todo-list task.')
            } else {
                const updatedTaskAsObj = { description: updatedTaskAsString, done: getUpdatedStatusOfPropDone() };
                return (updatedTaskAsObj)
            }
        }

        const todolistItemAsObjectToUpdate = transformUpdatedTaskStringIntoObj()
        const responseObj = await updateTask(endpoint, todolistItemAsObjectToUpdate);
        log(`Updated task (by checking or unchecking checkbox), as responsObj from local-api:  ${responseObj.description} | ${responseObj._id} | ${responseObj._updatedOn} | done: ${e.target.checked} `);
        const parent = document.getElementById('todo-list');
        const childToDelete2 = document.getElementById(`${responseObj._id}`);
        deleteOneChildNode(parent, childToDelete2 )            
        
        arrObjTask.done = responseObj.done
        arrObjTask.description = responseObj.description
        addTaskToDOM(arrObjTask)
    }
    checkboxTaskDone.addEventListener("click", toggleTaskBetweenDoneAndNotDone);
    
    
    checkboxTaskDone.addEventListener("keydown", (e) => {
        const regExpToSelectCheckboxTaskDone = new RegExp(/^task-done/);
        if (regExpToSelectCheckboxTaskDone.test(e.target.id)) {
            switch (e.key) {
                case ('Enter'):
                    e.target.checked = !e.target.checked;
                    // This inversion is needed to give the keyboard event 'Enter' on the checkbox the same behavior as a mouse click event on a checkbox. 
                    toggleTaskBetweenDoneAndNotDone(e);
            }
        }
    });


    const updateTaskMainFn = async function (e) {
        // display update-screen with save-btn, cancel-btn and input-field.
        const todolistItemToMakeInvisible = document.getElementsByClassName(`${e.target.parentNode.className}`)
        todolistItemToMakeInvisible[0].style.display = "none";
        const todoList = document.querySelector('.todo-list');
        const todolistItem = document.createElement('li');
        todolistItem.classList.add(`container-row-to-update-task${arrObjTask._id}`);
        const task = document.createElement('span');
        task.id = `task-being-updated${arrObjTask._id}`;
        task.contentEditable = 'true'
        const buttonSaveUpdatedTask = document.createElement("button")
        buttonSaveUpdatedTask.id = `save-updated${arrObjTask._id}`;
        const buttonCancelUpdatedTask = document.createElement("button")
        buttonCancelUpdatedTask.id = `cancel-updated${arrObjTask._id}`;
        const saveUpdatedTaskButton = "save"
        const button1TextElement = document.createTextNode(saveUpdatedTaskButton);
        const cancelUpdatedTaskButton = "cancel"
        const button2TextElement = document.createTextNode(cancelUpdatedTaskButton);
        buttonSaveUpdatedTask.appendChild(button1TextElement)
        buttonCancelUpdatedTask.appendChild(button2TextElement)
        buttonSaveUpdatedTask.classList.add('button-save-task');
        buttonCancelUpdatedTask.classList.add('button-cancel-task');
        task.contentEditable = 'true'   
        todolistItem.appendChild(buttonSaveUpdatedTask);
        todolistItem.appendChild(buttonCancelUpdatedTask);
        task.appendChild(textElem);
        todolistItem.appendChild(task);
        todoList.appendChild(todolistItem);
        task.focus()

        // source of next 10 lines of code and comments:( https://stackoverflow.com/questions/62272178/editable-text-inside-span-tags-place-cursor-at-the-end-javascript )
        //set a new range object
        let caret = document.createRange();
        //return the text selected or that will be appended to eventually
        let selection = window.getSelection();       
        //get the node you wish to set range to
        caret.selectNodeContents(task);
        //set collapse to null or false to set at end of node
        caret.collapse(null);
        //make sure all ranges are removed from the selection object
        selection.removeAllRanges();
        //set all ranges to null and append it to the new range object
        selection.addRange(caret);

        const saveUpdatedTaskMainFn = async () => {
            const todolistItemId = (`${e.target.parentNode.className}`)
            const endpoint = `${BASE_URL}${todolistItemId}`

            const getUpdatedTask = () => {
                const updatedTask = document.getElementById(task.id).innerText;
                return updatedTask;
            }
        
            const transformUpdatedTaskStringIntoObj = () => {      
                const updatedTaskAsString = getUpdatedTask()
                if (updatedTaskAsString.length === 0) {
                    alert('Please enter todo-list task.')
                } else {
                    const updatedTaskAsObj = { description: updatedTaskAsString, done: false };
                    return (updatedTaskAsObj)
                }
            }
            const todolistItemAsObjectToUpdate = transformUpdatedTaskStringIntoObj()
            const responseObj = await updateTask(endpoint, todolistItemAsObjectToUpdate);
            log(`Updated task (by editing text in inputfield), as responsObj from local-api:  ${responseObj.description} | ${responseObj._id} | ${responseObj._updatedOn} | ${responseObj.done} `);

            // overwrite DOM (view), so the local api (model) acts as the single source of truth. 
            if (responseObj.description === "") {
                console.error("After update of todolistItem description in the local api, the local api erroneously returns this description as an empty string.")
            } else {
                document.getElementById(`task-being-updated${responseObj._id}`).innerText = `${responseObj.description}`;
            }
            const parent = document.getElementById('todo-list');
            const childToDelete = document.querySelector(`.container-row-to-update-task${responseObj._id}`);
            deleteOneChildNode(parent, childToDelete)
            const childToDelete2 = document.getElementById(`${responseObj._id}`);
            deleteOneChildNode(parent, childToDelete2 )            
            arrObjTask.description = responseObj.description
            addTaskToDOM(arrObjTask)
        }
        buttonSaveUpdatedTask.addEventListener("click", saveUpdatedTaskMainFn)       


        const cancelUpdatedTaskMainFn = async () => {
            //assume that task has been modified (e.g. milk is now butter) but save-button has not been pressed (because todolist-user has changed his mind and wants to revert 'butter' back into 'milk'.)
            //step: undo the new task (e.g. butter becomes milk again) in the UI (implementing fast ui pattern)
            document.getElementById(task.id).innerText = todoListTaskDescription;

            const parent = document.getElementById('todo-list');
            const childToDelete = document.querySelector(`.container-row-to-update-task${arrObjTask._id}`);
            deleteOneChildNode(parent, childToDelete)

            const childToDelete2 = document.getElementById(`${arrObjTask._id}`);
            deleteOneChildNode(parent, childToDelete2 )            
            
            // step: display todolist task in overview with all todolist tasks, in the state (e.g. milk) before you started the update.
            addTaskToDOM(arrObjTask)
            // local api is still in sync (e.g. with milk), so no  need to update nor get data from local api.    
        }
        buttonCancelUpdatedTask.addEventListener("click", cancelUpdatedTaskMainFn)
        
    }
    task.addEventListener("click", updateTaskMainFn);


    const deleteTaskMainFn = async function (e) {
        // quickly make item-to-delete-in-local-api invisible in UI (implementing fast-ui-pattern)
        const elemToDelete = document.getElementsByClassName(`${e.target.parentNode.className}`)
        elemToDelete[0].style.display = "none";
        
        // step: deleteTaskInLocalApi    
        const idOfTaskToDelete = (`${e.target.parentNode.className}`)
        const endpoint = `${BASE_URL}${idOfTaskToDelete}`
        const responseObj = await deleteTask(endpoint);
        log(`responsObj.status from local-api about last deleted task: ${responseObj.status}`)
        if (responseObj.status !== 204) {
            console.error(`There is a problem deleting all tasks in one batch. Reproduce error: 1. add 5 tasks to todo-list. 2) click button Delete All Tasks`)
        }

        // get empty local api and overwrite DOM, so the local api (model) acts as the single source of truth. 
        const todoListItemsFromLocalApi = await getAllTasksFromLocalApi(BASE_URL);

        if (todoListItemsFromLocalApi.length === 0) {
            const todoList = document.querySelector('#todo-list');
            // There should not be any task left in the DOM. But if there are still task(s)  visible in the DOM, then this step removes them, thereby enforcing that the local-api is the single source of truth. 
            deleteAllChildNodes(todoList);
        } else if (todoListItemsFromLocalApi.length > 0) {
            const todoList = document.querySelector('#todo-list');
            // local-api is the single source of truth. So delete the remaining tasks in the DOM and replace with the (should be) (identical) items in the local_api. 
            deleteAllChildNodes(todoList);           
            todoListItemsFromLocalApi.map((arrObjTask) => addTaskToDOM(arrObjTask)); 
        }
    }
    iconDeleteTask.addEventListener("click", deleteTaskMainFn); 
    iconDeleteTask.addEventListener("keydown", (e) => {
        const regExpToSelectIconDelete = new RegExp(/^delete/);
        if (regExpToSelectIconDelete.test(e.target.id)) {
            switch (e.key) {
                case ('Enter'):
                    deleteTaskMainFn(e);
            }
        }
    });

};


const addTaskMainFn = async function (newTaskAsObj) {   
    try {
        //add data to DOM, in order to implement fast-ui-pattern.   
        addTaskToDOM(newTaskAsObj);
        // pitfall: data is visible in the dom, but has not yet been saved to the local api.
        // get all Data from model (local-api) and show in view (DOM)        
        const responseObjFromApi = await postTask(BASE_URL, newTaskAsObj);
        log(`created task, as responsObj from local-api:  ${responseObjFromApi.description} | ${responseObjFromApi._id} | ${responseObjFromApi._createdOn} | done: ${responseObjFromApi.done} `);

        if (responseObjFromApi.done !== false || responseObjFromApi._id === undefined) {
            console.error(`There is a problem adding an individual task to the todo-list in the local api. Reproduce error: 1. add 1 task to todo-list. 2) click button Add. `)
        }
    
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
        receivedArrWithToDoListItemsFromLocalApi.map((arrObjTask) =>  addTaskToDOM(arrObjTask));

    } catch (e) {
        log(`trouble in fn addTaskMainFn: ${e}. Check if the local api is up-and-running.`)
    }
};
    

document.addEventListener('keydown', function (event) {
    const regExpToSelectTaskBeingUpdated = new RegExp(/^task-being-updated/);

    if (event.target.id === 'new-task') {
        switch (event.key) {
            case ('Enter'):
                document.getElementById("new-task").blur();
                document.querySelector(".add-task").click();
                break;
        }
  
    } else if ( regExpToSelectTaskBeingUpdated.test(event.target.id)  ) {
        switch (event.key) {
            case ('Enter'):
                document.getElementById(event.target.id).blur();
                document.getElementById(`save-updated${(event.target.id).slice(18)}`).click();
                break;
        }
    }
});

document.addEventListener('keyup', function (event) {
    const regExpToSelectTaskToUpdate = new RegExp(/^task-on-todo-list/)
    if (regExpToSelectTaskToUpdate.test(event.target.id)) {
        switch (event.key) {
            case ('Enter'):
                // click on input-field 'task-on-todo-list' will open field (actually contenteditable <span>) with id 'task-being-updated'.
                document.getElementById(event.target.id).click();
        }      
    } else {
        switch (event.key) {
            case ('Enter'):
                document.getElementById("new-task").focus();
                break;
        }
    }
});