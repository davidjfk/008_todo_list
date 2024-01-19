# intro

The goal is to create a todo-list app, using only vanilla html, css and js. 

Below, first a list with implemented requirements (+ 2 fixed bugs). Second, the installation instructions for
both the local api, as well as the todo-list-app.  

<br/>
<br/>

# Requirements

All requirements (+ extra features) have been implemented: extra features, fixed bugs, requirements,  
API requirements, extra bonus.

<br/>
<br/>

## Basic requirements

1. As a user, I want to see an input field in which I can enter my task.
2. As a user, I can press a button with the text "Add Task" so that your completed task is added to the list.
3. As a user, when I clicked the add button, I see the task appear in my task list.
4. Delete task: As a user, I can click in the task list on an icon of a trash can, to the right of the task,  
   which removes the task from my task list.

<br/>
<br/>

## API requirements

5. GET: Get the (initial) list of tasks from the database.
6. POST: Update the task list with 1 new task. Send only {description: "blah", done: false}
7. DELETE: Delete a task from the database. Use the id you get back as an identifier.
8. Create a file called api-client.js as you have learned lately for all your requests.

<br/>
<br/>

## Bonus requirements

Bonus requirements:

9. Cross out a task As a user: I can click on a checkbox in the task list, to the left of the task,  
    which crosses the text of the task.
10. As a user, I want to be able to click on my task and change the text.  
    Additional API requirements (related to the above):
11. PUT: update an existing task the property done or not done.
12. PUT: update an existing task with the PUT method.

<br/>
<br/>

## extra features

13. **input field** = field with the placeholder text 'Add new tekst' where a user types a new task.  
    If a user then mouse clicks on button 'add' or presses Enter on the keyboard,  
    then the task is shown in the todolist field of a todo list item.

14. **todolist field** = field that shows the text of the todolist-item. If you select the  
    ***todolist field*** (with mouse click or keyboard enter), then you go to the update field.

15. **update field**  = input field where you update the todolist-task. If you then mouse click on  
    'save' or press keyboard Enter, then the task is saved.

16. usability: todolist-app can be used with only the keyboard (besides a combination of mouse and keyboard):

    * Add task with keyboard only: enter text in ***input field*** and press enter
    * Update task with keyboard only (tab to a ***todolist field***, then key-board-press 'Enter'. In next screen you can  
      modify the text and press enter to save (or click on the save- or cancel-button).
    * Remove one task with keyboard only, by tabbing on the delete-icon of a todolist-item and then pressing enter.
    * Remove all tasks with button 'Delete All Tasks' (clickable with mouse or keyboard 'Delete-button').
    * Toggle todolist-item between done and not done with keyboard (or with mouse).

17. usability: the caret ('cursor') is automatically shown at the end of the text in the ***update-field***.
18. usability: easy to quickly enter todo-list items with  keyboard: after each action (enter, delete, save, cancel),  
    the cursor will jump back to the ***input field***, so user can enter a new todo-item. There is one exception:  
    if you click (mouse) or press (keyboard enter) on a ***todolist field***, then the cursor will jump to the  
    ***update field***, where the text can be updated. After the update has been saved, or cancelled, the cursor will  
    jump back to the ***input field***, so the user can enter a new todo-item.
19. In the update screen there is a 'save-button'  to save the updated text of a todolist item.  
20. In the update screen there is a 'cancel-button'  to cancel the update of the text of a todolist item. The text  
    will revert back to the state before the upate was initiated.

<br/>
<br/>

## Fixed bugs
Feedback from Winc Mentor Samantha Vermeulen on Jan 10, 2022:

1. As a user, when I open the todolist-app, the todolist displays the todolist-items that are already in the local-api. (status: fixed).
2. As a user I  toggle task between done and not done with mouse. (status: fixed) --> this was working until I made this work with keyboard.  
   Then I forgot to regression test if the mouse-toggle was still working.

<br/>
<br/>

# Configuration
<br/>

## Run application
First run local api, then start todo-list app.  

* Goal: run local api:
- make sure you're using node >= 14
- `cd local_api`
- `npm install`
- `npm start`  
  
  The app will start on port 3000. Make sure the port is part of the URL you send  
  requests to. For example: a GET request to  
  `http://localhost:3000/`



* Goal: start todo-list app:
- load index.html into your browser. A quick way to do this is to e.g. use vsCode plugin 'Live Server' from ritwick Dey.  
  (benefit: any code changes will be automatically visible in the browser)
  or:  
- drag index.html into browser (but any code changes won't automatically be visible in the browser)
  
<br/>
<br/>
## Stop application

* Goal: stop todo-list app:
- Close browser tab with todo-list app.  
  or:  
- if you use vsCode 'Live Server' extension, then inside vsCode Rclick  on index.html and select 'Stop Live Server'.


* Goal: stop Node.js local API:
- press Ctrl+C 
  
  (Data will be saved persistently)



## Pre-installation steps

Use this to have a locally running REST API that accepts JSON.  
This was made as a simple replacement for JSONBox.io.  
In the installation process your shell will try to run a certain command. This
command needs to be able to clone repositories from Github using an SSH key.

To check if you can already do this try to run the following command from your terminal:

`git clone git@github.com:WincAcademy/local_api.git`

If this works you can continue on to installation.

If this does _not_ work you'll get an error like `Could not read from remote repository`.  
This means you need to take the following steps:

1. [generate an SSH key pair](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
2. [add your private key to your SSH agent](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)
3. give your _public key_ [to Github](https://github.com/settings/keys)

This command should now work:
`git clone git@github.com:WincAcademy/local_api.git`

[More info on how to clone a repository using the command line.](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-using-the-command-line)

<br/>
<br/>

## Send HTTP requests to local API

You can send 4 kinds of HTTP requests to this app.

All but the `delete` requests need to have the content-type header set to  
`application/json`.

<br/>
<br/>

### POST

To create an item send a POST request with a JSON object in the body to `/`. The  
return value will be the newly created object and HTTP status 201.

```json
{
  "name": "Ernie",
  "color": "orange",
  "mood": "happy",
  "_id": "f5408a45-b4d0-4aee-8530-c2250481b131",
  "_createdOn": "2021-01-25T14:53:49.322Z"
}
```

Each item gets an auto generated id and a `_createdOn` attribute.

<br/>
<br/>

### GET

To read all items send a GET request to `/`. The return value will be the list  
of all created objects and HTTP status 200.

```json
[
  {
    "name": "Ernie",
    "color": "orange",
    "mood": "happy",
    "_id": "f8636d68-e656-4c2e-ac99-a625f35a25f9",
    "_createdOn": "2021-01-25T14:59:50.834Z"
  },
  {
    "name": "Bert",
    "color": "yellow",
    "mood": "grumpy",
    "_id": "b0092da7-363f-4c20-859b-b6d4c008dcb3",
    "_createdOn": "2021-01-25T15:00:02.403Z"
  }
]
```

To read a single item send a GET request to `/{id_of_the_item}`. The return  
value will be the item, if it exists, and HTTP status 200.

```json
{
  "name": "Bert",
  "color": "yellow",
  "mood": "grumpy",
  "_id": "b0092da7-363f-4c20-859b-b6d4c008dcb3",
  "_createdOn": "2021-01-25T15:00:02.403Z"
}
```
<br/>
<br/>

### PUT

To update an item send a PUT request with a body to `/{id_of_the_item}`. The  
body should contain the updated item. The return value will be the updated item  
and HTTP status 200.

```json
{
  "name": "Groover",
  "color": "green",
  "mood": "hungry",
  "_id": "b0092da7-363f-4c20-859b-b6d4c008dcb3",
  "_createdOn": "2021-01-25T15:00:02.403Z",
  "_updatedOn": "2021-01-25T15:04:04.194Z"
}
```

An updated item gets an `_updatedOn` attribute.  

<br/>
<br/>

### DELETE AN ITEM

To delete an item send a DELETE request to `/{id_of_the_item}`. The return value  
will be HTTP 204.

<br/>
<br/>

### DELETE DB

If you want to start over:

- stop the app
- delete the files in `db/`
- restart the app
