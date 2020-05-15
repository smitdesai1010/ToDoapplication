var list=document.querySelector('.todo-list');

document.querySelector('#header').addEventListener('click',changename);

document.querySelector('#btn').addEventListener('click',()=>{

  let value=getvalue();

  if (value==='')
  {
   alert('Cannot add empty item');
   return;
  }
  
  addtolist(value);

    todoList=JSON.parse(localStorage.getItem('todoObjs'));
    todoList.push(value);
    localStorage.setItem('todoObjs',JSON.stringify(todoList));

});

document.addEventListener('DOMContentLoaded',()=>{
  loadname();
  loadtodo();
})


function addtolist(todoobj){

  event.preventDefault();

  const obj=document.createElement('div');
  obj.classList.add('list-obj');

  const value=document.createElement('li');
  value.classList.add('list-obj-value');
  value.innerText=todoobj;

  const mark=document.createElement('button');
  mark.innerHTML='<i class="fas fa-check-square"></i>';
  mark.classList.add('list-obj-mark');
  mark.setAttribute('onclick' ,'checked(this.previousSibling)');

  const trash=document.createElement('button');
  trash.innerHTML='<i class="fas fa-trash"></i>';
  trash.classList.add('list-obj-trash');
  trash.setAttribute('onclick' ,'trash(this.parentNode)');



  todoCheck=JSON.parse(localStorage.getItem('checked'))

   if (todoCheck!==null)
   {
      for (j=0; j<todoCheck.length; ++j)
       if (todoCheck[j]===todoobj)
        value.classList.add('checked');
   }

   obj.appendChild(value);
   obj.appendChild(mark);
   obj.appendChild(trash);

  list.appendChild(obj);
}


function getvalue(){

  var value=document.querySelector('#input-value').value;
  document.querySelector('#input-value').value='';

  return value;
}


function checked(doc){
  doc.classList.toggle('checked');

  var todocheck;

  if (localStorage.getItem('checked')===null)
    todocheck=[];
  else
    todocheck=JSON.parse(localStorage.getItem('checked'));

  todocheck.push(doc.innerHTML);

  localStorage.setItem('checked',JSON.stringify(todocheck));
}



function trash(element){

  element.classList.toggle('delete-animation');

  //Stopped Event bubbling by event capturing 'transitionend' on parent element
  //set 'transitionend' to not to propgate upwards on parentNode. Then used
  //event capturing on that so to pass that feature on all childNodes
  //otherwise it was event bubbling was taking place.
  element.addEventListener('transitionend',()=>{ event.stopPropagation(); },true);

  todoList=JSON.parse(localStorage.getItem('todoObjs'));
  todoCheck=JSON.parse(localStorage.getItem('checked'));


    for (i=0; i<todoList.length; ++i)
     if (todoList[i]===element.firstChild.innerHTML)
      todoList.splice(i,1);

   localStorage.setItem('todoObjs',JSON.stringify(todoList));

   if (todoCheck!==null)
   {
    for (i=0; i<todoCheck.length; ++i)
     if (todoCheck[i]===element.firstChild.innerHTML)
      todoCheck.splice(i,1);

      localStorage.setItem('checked',JSON.stringify(todoCheck));
   }

  element.addEventListener('transitionend',()=>{
    element.remove();
  });

}


function loadtodo(){

  var todoList;

  if (localStorage.getItem('todoObjs')===null)
  {
    todoList=[];
    localStorage.setItem('todoObjs',JSON.stringify(todoList));
    return;
  }

  else
   todoList=JSON.parse(localStorage.getItem('todoObjs'));

  for (i=0; i<todoList.length; ++i)
   addtolist(todoList[i]);
}

function loadname(){
  if (localStorage.getItem('name')===null)
   localStorage.setItem('name',prompt('Hey! Welcome! Please type your name'));

   document.getElementById('header').innerHTML=localStorage.getItem('name')+'\'s ToDo List';
}


function changename(){

  if (confirm('Do you want to change your name?'))
  {
    localStorage.setItem('name',prompt('Hey! Welcome! Please type your name'));
    document.getElementById('header').innerHTML=''+localStorage.getItem('name')+"'s ToDo List";
  }

}
