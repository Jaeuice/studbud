const todos = document.querySelectorAll(".todo, .doing, .done");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

//Drag function
function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

//Write a modal functions to add task
const bttn = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

//Ergodic the button
bttn.forEach((btn) => {
  btn.addEventListener("click", () => { //Add listner event to ech clickng button action
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

//Set the clearing button function
close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

//Add a listner event while clicking on the submit button
todo_submit.addEventListener("click", createTodo);

//write function which is used to create a todo task
function createTodo() {
  const todo_div = document.createElement("div");//Create an element called todo_div to store the data
  const input_val = document.getElementById("todo_input").value; //Get the input information
  const txt = document.createTextNode(input_val);//Create a new text node

  todo_div.appendChild(txt);//Add  new txt node to the todo_div
  todo_div.classList.add("todo");//Add 'to do' into the todo_div
  todo_div.setAttribute("draggable", "true");//Make todo_div draggale

  /* create span */
  const span = document.createElement("span"); //Create a span element store the data
  const span_txt = document.createTextNode("\u00D7");// Create a new text node 
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(span);

  todo.appendChild(todo_div);
  // Addd an event listner while click
  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
 console.log(todo_div);

  //Add an event listener while dragging
  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}


//Use same function fo user to add doing stuff,the storage root is doing div not to do
const doing_submit = document.getElementById("doing_submit");
  doing_submit.addEventListener("click", createDoing);
function createDoing() {
  const doing_div = document.createElement("div");
  const input_val = document.getElementById("doing_input").value; 
  const txt = document.createTextNode(input_val);

  doing_div.appendChild(txt);
  doing_div.classList.add("doing");
  doing_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span"); 
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  doing_div.appendChild(span);

  doing.appendChild(doing_div);
  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
 console.log(doing_div);

  //Add an event listener while dragging
  doing_div.addEventListener("dragstart", dragStart);
  doing_div.addEventListener("dragend", dragEnd);

  document.getElementById("doing_input").value = "";
  doing_form.classList.remove("active");
  overlay.classList.remove("active");
}


//Use same function fo user to add done stuff,the storage root is doing div not to do
const done_submit = document.getElementById("done_submit");
  done_submit.addEventListener("click", createDone);
function createDone() {
  const done_div = document.createElement("div");
  const input_val = document.getElementById("done_input").value; 
  const txt = document.createTextNode(input_val);

  done_div.appendChild(txt);
  done_div.classList.add("done");
  done_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span"); 
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  done_div.appendChild(span);

  done.appendChild(done_div);
  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
 console.log(done_div);

  //Add an event listener while dragging
  done_div.addEventListener("dragstart", dragStart);
  done_div.addEventListener("dragend", dragEnd);

  document.getElementById("done_input").value = "";
  done_form.classList.remove("active");
  overlay.classList.remove("active");
}



const close_btns = document.querySelectorAll(".close");

//Add listner event to the close button clicking
close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});