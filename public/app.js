const list=document.querySelector(".todolist");
var inputfield=document.getElementById("todoinput");
var strong=document.querySelector("strong");
let count=0;
let todoItems=[];
let itemsleft=0;

inputfield.addEventListener("keydown",function(event){
  var div=document.querySelectorAll("footer");
  div[0].classList.remove("hidden");
  div[1].classList.remove("hidden");
  if(event.key=="Enter"){
    var text=inputfield.value.trim();
    if(text!==""){
      count++;
      addTodo(text,count);
      inputfield.value="";
      inputfield.focus();
    }
  }
});


function addTodo(text,count){
  var obj={val:text,checked:false,id:count};
  todoItems.push(obj);
  list.insertAdjacentHTML("beforeend",`
<li class="todo-item" id="${count}">
<input class="checkbox js-check" type="checkbox" name="checkbox">
<span class="text">${text}</span>
<button class="delete-todo js-delete">X</button>
</li>
`);
var checkbox=document.getElementsByName('checkbox');
let checkitems=0;
for(let i=0;i<checkbox.length;i++){
  if(checkbox[i].checked){
    checkitems++;
  }
}
itemsleft=todoItems.length-checkitems;
strong.textContent=itemsleft;
}
list.addEventListener("click",event=>{
  if(event.target.classList.contains('js-check')){
  const listkey=event.target.parentElement.id;
  toggletask(listkey);
  }
  if(event.target.classList.contains('js-delete')){
      const listid=event.target.parentElement.id;
      deletetask(listid);
  }
});
function toggletask(key){
  const index=todoItems.findIndex(item=>item.id==Number(key));
  todoItems[index].checked=!todoItems[index].checked;
  
  var listitem=document.getElementById(`${key}`).children;

  var complete=document.getElementById(`${key}`);
  
  var checkbox=document.getElementsByName('checkbox');
  let checkitems=0;
  for(let i=0;i<checkbox.length;i++){
    if(checkbox[i].checked){
      checkitems++;
    }
  }
  itemsleft=todoItems.length-checkitems;
  strong.textContent=itemsleft;

  if(todoItems[index].checked){
    //strike out the text;
    complete.classList.add('complete');
    complete.classList.remove('notcomplete');
    listitem[1].style.textDecoration="line-through";
  }
  else{
    complete.classList.remove('complete');
    complete.classList.add('notcomplete');
    listitem[1].style.textDecoration="none";
  }
}
function deletetask(listid){
    var listitem=document.getElementById(`${listid}`);
    listitem.remove();
    var cpy=todoItems;
    var index=0;
    console.log(cpy);
    cpy.forEach(element=>{
      if(element.id==Number(listid)){
        index=todoItems.indexOf(element);
      }
    });
    todoItems.splice(index,1);
    if(list.children.length==0){
    var div=document.querySelectorAll("footer");
    div[0].classList.add("hidden");
    div[1].classList.add("hidden");
  }
  
    var checkbox=document.getElementsByName('checkbox');
  let checkitems=0;
  for(let i=0;i<checkbox.length;i++){
    if(checkbox[i].checked){
      checkitems++;
    }
  }
  itemsleft=todoItems.length-checkitems;
  strong.textContent=itemsleft;
}

list.addEventListener("dblclick", event=>{
  if(event.target.classList.contains('text')){
    var val=event.target.textContent;
    const listkey=event.target.parentElement.id;
    var parent=document.getElementById(`${listkey}`);
    // toggletask(listkey);
    var span=parent.children[1];
    var newelement=document.createElement('input');
    newelement.setAttribute("value",`${val}`);
    editableSpan(parent,span,newelement);
  }
});

function editableSpan(parent,span,newelement){
  parent.replaceChild(newelement,span);
  newelement.addEventListener("blur",event=>{
    var content=newelement.value;
    span.textContent=`${content}`;
    parent.replaceChild(span,newelement);
  });
}

var btn=document.getElementById("button");
var btncount=0;
btn.addEventListener("click", event=>{
  btncount++;
  var checkboxes=document.getElementsByName("checkbox");
  var spanelements=document.getElementsByClassName("text");
  var listelements=document.getElementsByClassName("todo-item");

  for(var element of checkboxes){
    if(btncount%2==1){
      element.checked=true;
      for(let obj of todoItems){
        obj.checked=true;
      }
      for(let i=0;i<spanelements.length;i++){
        listelements[i].classList.add('complete');
        spanelements[i].style.textDecoration="line-through";
      }
      itemsleft=0;
      strong.textContent=itemsleft;

    }
    else{
      element.checked=false;
      for(let obj of todoItems){
        obj.checked=false;
      }
      for(let i=0;i<spanelements.length;i++){
        listelements[i].classList.remove('complete');
        spanelements[i].style.textDecoration="none";
      }
      itemsleft=todoItems.length;
      strong.textContent=itemsleft;
    }
  }
});

//clear completed items

var clearbtn=document.getElementById("clearbtn");
clearbtn.addEventListener("click",event=>{
  var completedlists=document.getElementsByClassName("complete");
  for(let i=0; i<completedlists.length;i++){
    let element=completedlists[i];
    let idlist=element.id;
    element.remove();
    i--;
    let cpy=todoItems;
    var index=0;
    console.log(cpy);
    cpy.forEach(e=>{
      if(e.id==Number(idlist)){
        index=todoItems.indexOf(e);
      }
    });
    todoItems.splice(index,1);
  }
  if(list.children.length==0){
    var div=document.querySelectorAll("footer");
    div[0].classList.add("hidden");
    div[1].classList.add("hidden");
  }
});

//filters

var all=document.querySelector(".all");
all.addEventListener("click",event=>{
    for(let e of document.querySelectorAll(".todo-item")){
      e.style.display="grid";
    }
});

var active=document.querySelector(".active");
active.addEventListener("click", event=>{
  var litems=document.querySelectorAll(".todo-item");
  for(let e of document.querySelectorAll(".complete")){
    e.style.display="none";
  }
  for(let e of litems){
    if(!e.classList.contains("complete")){
      e.style.display="grid";
    }
  }
});

var completed=document.querySelector(".completed");
completed.addEventListener("click",event=>{
  for(let e of document.querySelectorAll(".complete")){
    e.style.display="grid";
  }
  for(let e of document.querySelectorAll(".todo-item")){
    if(!e.classList.contains("complete"))
      e.style.display="none";
  }
});