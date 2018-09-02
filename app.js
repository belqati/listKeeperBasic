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
  // remove item event
  itemList.addEventListener('click', removeItem);
  // clear all items event
  clearBtn.addEventListener('click', clearItems);
  // filter tasks event
  filter.addEventListener('keyup', filterItems);
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
  link.innerHTML = '<i class="fas fa-times"></i>';
  // append link
  li.appendChild(link);
  // append li to ul
  itemList.appendChild(li);
  // clear input
  itemInput.value = '';

  e.preventDefault();
}

// remove item
function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Do you want to remove this item?')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

// clear all items
function clearItems(){
  // could use: itemList.innerHTML = '';
  // but removechild has better performance than innerHTML; see https://jsperf.com/innerhtml-vs-removechild
  if(itemList.firstChild){
    if(confirm('Remove all items?')){
      while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
      }
    }
  }
}

// filter list items
function filterItems(e){
  // convert all entered text to lower-case for matching
  const text = e.target.value.toLowerCase();

  // grab all list items to search
  // returns node-list of list items so forEach() works
  document.querySelectorAll('.collection-item').forEach(function(filterElement){
    // variable holds li->string->text for each list item
    const item = filterElement.firstChild.textContent;
    // check if entered text exists within the looped list item
    // indexOf() returns the index value in list item of the first matched letter; no match = -1
    if(item.toLowerCase().indexOf(text) != -1){
      // display list item
      // console.log(item.indexOf(text))
      filterElement.style.display = 'block';
    } else {
      filterElement.style.display = 'none';
    }
  });
}