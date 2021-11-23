//Selectors
const formCreateTodo = document.querySelector('.createTodoForm');
const todoInp = document.querySelector('.')
const openFormBtn = document.querySelector('.add-btn');
const closeFormBtn = document.querySelector('.container .formTodo-container form .fa-times');
const createTodoBtn = document.querySelector('.createTodoBtn');
const cards = document.querySelectorAll('.card');
let draggableTodo = null;


//Event Listeners
openFormBtn.addEventListener('click', openFormFunc)
closeFormBtn.addEventListener('click', closeFormFunc)
createTodoBtn.addEventListener('click', createToDoFunc)
cards.forEach(card => {
	card.addEventListener('click', removeTodoFunc);
	card.addEventListener('dragstart', dragStart);
	card.addEventListener('dragend', dragEnd);
	card.addEventListener('dragover', dragOver)
	card.addEventListener('dragenter', dragEnter)
	card.addEventListener('dragleave', dragLeave)
	card.addEventListener('dragdrop', dragDrop)
})



//Functions
function openFormFunc(event){
	event.preventDefault();
	formCreateTodo.classList.add('active');
	todoInp.focus();
}

function closeFormFunc(){
	formCreateTodo.classList.remove('active');
}
function createTodoFunc(event){
	event.preventDefault();

	if(!todoInp.value.trim()) return;

	const div = document.createElement('div');
	div.classList.add('todo');
	div.setAttribute("draggable", "true");
	div.innerText += '<i class="fa fa-times"></i>';
	let p = document.createElement('p');
	p.innerText = todoInp.value;

	div.appendChild(p);
	cards[0].appendChild(div);

	saveInLocalStorage(cards[0].children[0].innerText,
		div.children[0].innerText
		);

	todoInp.value = '';
	closeFormFunc();

}

function removeTodoFunc(event){
	if(event.target.classList[1] === 'fa-times'){
		event.target.parentElement.remove();
	}
}

function dragStart(event){
	if(event.target.classList[0] === 'todo'){
		draggable = event.target;

		setTimeout(() => {
			event.target.style.display = 'none'
		}, 0);

		removeFromLocalStorage(
			draggable.parentElement.children[0].innerText,
			draggable.children[0].innerText
		)
	}
}
function  dragEnd(event){
	if(event.target.classList[0] = 'todo'){
		draggable = null;
		setTimeout(() => {
			event.target.style.display = 'block'
		}, 0)
	}
}
function dragOver(event){
	event.preventDefault()
}
function  dragEnter(event){

}
function  dragLeave(event){

}
function dragDrop(event){
	event.target.append(draggable);

	saveInLocalStorage(
		draggable.parentElement.children[0].innerText,
		draggable.children[0].innerText
	)
}

function saveInLocalStorage(key, text){
	let arr;
	if(localStorage.getItem(key) === null){
		arr = []
	} else{
		arr = JSON.parse(localStorage.getItem(key))
	}
	arr.push(text);
	localStorage.setItem(key, JSON.stringify(arr))
}

function removeFromLocalStorage(key, text){
	let arr;
	if(localStorage.getItem === null){
		arr = []
	}else{
		arr = JSON.parse(localStorage.getItem(key))
	}
	let index = arr.indexOf(text);
	arr.splice(index, 1);
	localStorage(key, JSON.stringify(arr))
}