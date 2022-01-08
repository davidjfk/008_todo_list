const BASE_URL = `http://localhost:3000/`;

const deleteTask = async (endpoint) => {
    try {
        const resultObj = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // pitfall: no need to async convert the result into json
      return resultObj;
    } catch (e) {
        log(e);    
    }
  };

const getAllTasksFromLocalApi = async (endpoint) => {
  try {
      const result = await fetch(endpoint, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      const json = await result.json();
    return json;
  } catch (e) {
      log(e);    
  }
};

const postTask = async (endpoint, newTaskToAdd) => {
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(newTaskToAdd),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await result.json();
      return json;
    } catch (e) {
        log(e);    
    }
};

const updateTask = async (endpoint, newTaskToAdd) => {
    try {
        const result = await fetch(endpoint, {
            method: "PUT",
            body: JSON.stringify(newTaskToAdd),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.status !== 200) {
            console.error(`There is a problem updating a todoList item. Reproduce error: 1. add 1 task to todo-list. 2) click button 'update'. 3. update the text of todoList item. 4. click 'save' `)
        }
        const json = await result.json();
      return json;
    } catch (e) {
        log(e);    
    }
};

