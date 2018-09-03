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
  // add item event
  form.addEventListener('submit', addItem);
  // remove item event
  itemList.addEventListener('click', removeItem);
  // clear all items event
  clearBtn.addEventListener('click', clearItems);
  // filter items event
  filter.addEventListener('keyup', filterItems);
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
  // clear input
  itemInput.value = '';

  // clear noList message when item added to list;
  noList.style.display = 'none';

  // prevent default form behavior
  e.preventDefault();
}

// remove item via delete link
function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Do you want to remove this item?')){
      // remove li<a<icon
      e.target.parentElement.parentElement.remove();
    }
  }
}

// remove all items
function clearItems(){
  // could use: itemList.innerHTML = '';
  // but removechild has better performance than innerHTML; see https://jsperf.com/innerhtml-vs-removechild for test demonstration
  // if at least one item in list via firstChild
  if(itemList.firstChild){
    if(confirm('Remove all items?')){
      // remove firstChild until there are none
      while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
      }
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
