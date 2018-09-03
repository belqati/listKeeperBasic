// define UI vars
const form = document.querySelector('#item-form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const itemInput = document.querySelector('#item');
const itemLabel = document.querySelector('#itemLabel');
const noList = document.querySelector('#noList');
const noMatchMessage = document.querySelector('#noMatchMessage');

// load all event listeners
loadEventListeners();

// create each listener as a module, then add all of them to a function
function loadEventListeners(){
  // DOM load event--fires getItems function for handling local storage "when the initial HTML document has been completely loaded and parsed" (MDN)
  document.addEventListener('DOMContentLoaded', getItems)
  // add item event
  form.addEventListener('submit', addItem);
  // remove item event
  itemList.addEventListener('click', removeItem);
  // clear all items event
  clearBtn.addEventListener('click', clearItems);
  // filter items event
  filter.addEventListener('keyup', filterItems);
}

// get and display items from local storage
function getItems(){
  // variable to hold local storage string/array
  let items;
  // check if local storage empty
  if(localStorage.getItem('items') === null){
    // if yes, create array
    items = [];
    // if no, get array-string and parse
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  // display each item in array
  items.forEach(function(item){
    // create li element
    const li = document.createElement('li');
    // add class to li for filter function
    li.className = 'collection-item';
    // create text node for input value and append
    li.appendChild(document.createTextNode(item));
    // create link for item deletion
    const link = document.createElement('a');
    // add class for removeItem, add class for Materialize float-right
    link.className = 'delete-item secondary-content';
    // add delete icon html
    link.innerHTML = '<i class="deleteItem fas fa-times"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    itemList.appendChild(li);
  });
}

// add item
function addItem(e){
  // prevent entry of empty item
  if(itemInput.value === ''){
    return itemLabel.innerHTML = '<em>Please add a list item.</em>';
  };

  // create li element
  const li = document.createElement('li');
  // add class to li for filter function
  li.className = 'collection-item';
  // create text node for input value and append
  li.appendChild(document.createTextNode(itemInput.value));
  // create link for item deletion
  const link = document.createElement('a');
  // add class for removeItem, add class for Materialize float-right
  link.className = 'delete-item secondary-content';
  // add delete icon html
  link.innerHTML = '<i class="deleteItem fas fa-times"></i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  itemList.appendChild(li);

  // clear noList message when item added to list;
  noList.style.display = 'none';

  // store to local storage function
  storeInLocalStorage(itemInput.value);

  // clear input (after local storage!)
  itemInput.value = '';

  // prevent default form behavior
  e.preventDefault();
}

// store item to local storage
function storeInLocalStorage(item){
  // variable to hold item
  let items;
  // check if local storage empty
  if(localStorage.getItem('items') === null){
    // if yes, create array
    items = [];
    // if no, get array-string and parse
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  // add new item to array
  items.push(item);
  // set converted array-string back to local storage
  localStorage.setItem('items', JSON.stringify(items));
}

// remove item via delete link
function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Do you want to remove this item?')){
      // remove li<a<icon from DOM
      e.target.parentElement.parentElement.remove();

      // remove item from local storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove item from local storage
function removeFromLocalStorage(rmItem){
  // // variable to hold local storage string/array
  // let items;
  // // check if local storage empty
  // if(localStorage.getItem('items') === null){
  //   // if yes, create array
  //   items = [];
  //   // if no, get array-string and parse
  // } else {
  //   items = JSON.parse(localStorage.getItem('items'));
  // }

  let items = JSON.parse(localStorage.getItem('items'));

  
  items.forEach(function(item, index){
    if(rmItem.textContent === item){
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

// remove all items
function clearItems(){
  // could use: itemList.innerHTML = '';
  // but removechild has better performance than innerHTML; see https://jsperf.com/innerhtml-vs-removechild for test demonstration

  // if at least one item in list via firstChild
  if(itemList.firstChild){
    // remove firstChild from DOM until there are none
    if(confirm('Remove all list items?')){
      while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
      }
      // remove all items from local storage
      localStorage.clear();
    }
  }
}

// filter list items
function filterItems(e){
  // convert all entered text to lower-case for better matching
  const text = e.target.value.toLowerCase();
  // for marking positive matches
  let match = 0;

  // return node-list of all items; forEach() works with node-list
  document.querySelectorAll('.collection-item').forEach(function(filterElement){
    // variable holds li->string->text for each list item
    const item = filterElement.firstChild.textContent;
    // check if entered text exists within the looped list item
    // indexOf() returns the index value in list item of the first matched letter; no match = -1
    if(item.toLowerCase().indexOf(text) != -1){
      // display list item
      filterElement.style.display = 'block';
      // mark positive match
      match++;
    } else {
      filterElement.style.display = 'none';
    }
  });

  // display noList message if no list exists to search
  if (document.querySelectorAll('.collection-item').length === 0){
    noList.style.display = 'block';
  // display noMatchMessage if no there are no matches
  } else if(match === 0 && document.querySelectorAll('.collection-item').length > 0){
    noMatchMessage.style.display = 'block';
  } else {
    noMatchMessage.style.display = 'none';
  }
}
