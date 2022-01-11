# All requirements (+ extra features) have been implemented: extra features, fixed bugs, requirements, API requirements, extra bonus

## extra features

**input field** = field with the placeholder text ‘Add new tekst’ where a user types a new task.  If a user then mouse clicks on button ‘add’ or presses Enter on the keyboard, then the task is shown in the todolist field of a todo list item.

**todolist field** = field that shows the text of the todolist-item. If you select the ***todolist field*** (with mouse click or keyboard enter), then you go to the update field.

**update field**  = input field where you update the todolist-task. If you then mouse click on ‘save’ or press keyboard Enter, then the task is saved.

usability: todolist-app can be used with only the keyboard (besides a combination of mouse and keyboard):

* Add task with keyboard only: enter text in ***input field*** and press enter
* Update task with keyboard only (tab to a ***todolist field***, then key-board-press ‘Enter’. In next screen you can modify the text and press enter to save (or click on the save- or cancel-button).
* Remove one task with keyboard only, by tabbing on the delete-icon of a todolist-item and then pressing enter.
* Remove all tasks with button ‘Delete All Tasks’ (clickable with mouse or keyboard ‘Delete-button’).
* Toggle todolist-item between done and not done with keyboard (or with mouse).

1. usability: the caret (“cursor”) is automatically shown at the end of the text in the ***update-field***.
2. usability: easy to quickly enter todo-list items with  keyboard: after each action (enter, delete, save, cancel, the cursor will jump back to the ***input field***, so user can enter a new todo-item. There is one exception: if you click (mouse) or press (keyboard enter) on a ***todolist field***, then the cursor will jump to the ***update field***, where the text can be updated. After the update has been saved, or cancelled, the cursor will jump back to the ***input field***, so the user can enter a new todo-item.
3. In the update screen there is a ‘save-button’  to save the updated text of a todolist item.
4. In the update screen there is a ‘cancel-button’  to cancel the update of the text of a todolist item. The text will revert back to the state before the upate was initiated.

## Fixed bugs

Feedback from Winc Mentor Samantha Vermeulen on Jan 10, 2022:

1. As a user, when I open the todolist-app, the todolist displays the todolist-items that are already in the local-api. (status: fixed).
2. As a user I  toggle task between done and not done with mouse. (status: fixed) --> this was working until I made this work with keyboard. Then I forgot to regression test if the mouse-toggle was still working.

## requirements

* As a user, I want to see an input field in which I can enter my task.
* As a user, I can press a button with the text "Add Task" so that your completed task is added to the list.
* As a user, when I clicked the add button, I see the task appear in my task list.
* Delete task: As a user, I can click in the task list on an icon of a trash can, to the right of the task, which removes the task from my task list.

## API requirements

* GET: Get the (initial) list of tasks from the database.
* POST: Update the task list with 1 new task. Send only {description: "blah", done: false}
* DELETE: Delete a task from the database. Use the id you get back as an identifier.
* Create a file called api-client.js as you have learned lately for all your requests.

## extra bonus

Additional requirements:

* Cross out a task As a user: I can click on a checkbox in the task list, to the left of the task, which crosses the text of the task.
* As a user, I want to be able to click on my task and change the text.
Additional API requirements (related to the above):
* PUT: update an existing task the property done or not done.
* PUT: update an existing task with the PUT method.
