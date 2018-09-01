// define UI vars
const form = document.querySelector('#item-form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const itemInput = document.querySelector('#item');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
  // add item event
  form.addEventListener('submit', addItem);
}

// add item
function addItem(e){
  if(itemInput.value === ''){
    alert('Please add a list item.');
  };

  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append
  li.appendChild(document.createTextNode(itemInput.value));
  // create new link
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class= "fas fa-times"></i>';
  // append link
  li.appendChild(link);

  // append li to ul
  itemList.appendChild(li);

  console.log(li);

  // clear input
  itemInput.value = '';

  e.preventDefault();
}