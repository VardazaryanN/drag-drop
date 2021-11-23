const todoInp = document.querySelector('.todo-inp');
const addBtn = document.querySelector('.add-btn');
const creatForm = document.querySelector('.form-todo');
const createToDoBtn = document.querySelector('.createToDo');
const closeForm = document.querySelector('.formClose');
const allCards = document.querySelectorAll('.card');
let draggableTodo = null;

//Event Listeners

addBtn.addEventListener('click', openFormFunc);
closeForm.addEventListener('click', closeFormFunc);
createToDoBtn.addEventListener('click', createToDo);

 allCards.forEach((card) => {
 	card.addEventListener("dragstart", dragStart);
	card.addEventListener("dragend", dragEnd);
	card.addEventListener('click', removeTodo)
	card.addEventListener("dragover", dragOver);
	card.addEventListener("dragenter", dragEnter);
	card.addEventListener("dragleave", dragLeave);
	card.addEventListener("drop", dragDrop);
 });

 //Functions


 function openFormFunc(event){
	event.preventDefault();
    creatForm.classList.add('active');
    todoInp.focus();
}
function closeFormFunc(){
	creatForm.classList.remove('active');
}

function createToDo(event){
	event.preventDefault();
	
	if(!todoInp.value.trim()) return;

   const div = document.createElement('div');
	div.classList.add('todo');
	div.innerHTML += '<i class="fa fa-times"></i>';
	div.setAttribute("draggable", "true");

	let p = document.createElement('p');
    p.innerText = todoInp.value;
    
	div.appendChild(p);
	allCards[0].appendChild(div);
	
	saveInLocalStorage(
		allCards[0].children[0].innerText, 
		div.children[0].innerText
		);

    todoInp.value = '';
	creatForm.classList.remove('active');
}

function removeTodo(event){
	
		if(event.target.classList[1] === 'fa-times'){
			 
			 event.target.parentElement.remove();
		}
}


 function dragStart(event) {
 	if(event.target.classList[0] === 'todo'){
 		draggableTodo = event.target;
 		
			setTimeout(() => {
	 		 event.target.style.display = "none";
		     }, 0);
		removeFromLocalStorage(
	        draggableTodo.parentElement.children[0].innerText,
	        draggableTodo.children[0].innerText
    	);
 	}
	
 }
 
 function dragEnd(event) {
 	if(event.target.classList[0] === 'todo'){
 		draggableTodo = null;
		setTimeout(() => {
	  	event.target.style.display = "block";
		}, 0);
 	}
	

 }
 
 function dragOver(event) {
	event.preventDefault();
	
 }
 
 function dragEnter() {}
 
 function dragLeave() {}
 
 function dragDrop(event) {
	event.target.append(draggableTodo);

	saveInLocalStorage(
        draggableTodo.parentElement.children[0].innerText,

        draggableTodo.children[0].innerText);
 }



//LocalStorage

function  saveInLocalStorage(key,text) {
    let arr;
    if (localStorage.getItem(key)===null) {
        arr=[];
    }
    else{
        arr=JSON.parse(localStorage.getItem(key));
    }
    arr.push(text);
    localStorage.setItem(key,JSON.stringify(arr));
}
function removeFromLocalStorage(key, text){
    let arr;
    if (localStorage.getItem(key)===null) {
        arr=[];
    }
    else{
        arr=JSON.parse(localStorage.getItem(key));
    }
    let index=arr.indexOf(text);
    arr.splice(index,1);
    localStorage.setItem(key,JSON.stringify(arr));
}

//Vanilla-tilt

VanillaTilt.init(document.querySelectorAll(".card"), {
	max: 25,
	speed: 400,
	glare: true,
	"max-glare": 1,
});

