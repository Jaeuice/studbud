import KanbanAPI from "./api/KanbanAPI.js";


// Set the element need to return which is used as selecting button
let items=document.querySelectorAll('.item');

function buttonClick(){
    items.forEach((item)=>{
        item.classList.remove('active');
    })
    this.classList.add('active');
}
// Set clicking action for each item
items.forEach((item)=>{
    item.addEventListener('click',buttonClick)})