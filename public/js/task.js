const wrapper = document.querySelectorAll(".task ul");
const ownList = document.getElementsByTagName("li");

function closeButton() {
      for (i = 0; i < ownList.length; i++) {
        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7"); 
        span.className = "close";
        span.appendChild(txt);
        ownList[i].appendChild(span);
    }
}


function closeElement() {
      var close = document.getElementsByClassName("close");
      for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          var div = this.parentElement; /*关闭按钮的父元素 - li*/
          div.style.display = "none";
        }
      }
    }
  
function ifChecked() {
    var list = document.querySelector('ul');
    list.onclick = function(ev) {
        if (ev.target.tagName === 'LI') {
          ev.target.classList.toggle('checked');
        }
      }
    }
  
    /*点击添加时，创建一个新的ul*/
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("taskName").value;
    var t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === '') {
        alert("Wrong task");
      } else {
        document.getElementById("myUL").appendChild(li);
      }
      document.getElementById("taskName").value = ""; /*清空输入*/
    }

    function initList() {   
      closeButton();
      closeElement();
      ifChecked();
    }
    
//Initialize the funciton
    
function init() {
    var addButton = document.getElementById("addBtn"); 
    initList();

//Click on the button add line
addButton.onclick = function() {
    newElement();
    initList();
      }

 init(); }