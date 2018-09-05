# listKeeperBasic

<img src="img/list_icon.ico" width="20px"> *listKeeperBasic* is a list app created under the direction of [Brad Traversy](https://www.udemy.com/modern-javascript-from-the-beginning/) in his *Modern JavaScript from the Beginning* course. The app uses the following technologies:

  * JavaScript
  * HTML
  * CSS
  * Materialize-css

<img src="img/listKeeperBasic.JPG" width="50%">

### New Items

When new items are added to the list, they are added to the DOM and and persist via `.localStorage` using JavaScript. Items can be deleted on an individual basis from the DOM/`.localStorage`, or the entire list can be emptied at once. Both possibilities are accompanied by a `confirm()` message.

<img src="img/listKeeperBasic-localStorage.JPG" width="50%">

### Filter List

List items can be filtered, where only matching items populate the list.

<img src="img/listKeeperBasic-filterList.JPG" width="50%">

### Prompts and Error Handling

*listKeeperBasic* prevents an empty population items, marked by a prompt in the `New Item` field. A prompt likewise accompanies any attempt to filter a non-existent list.

<img src="img/listKeeperBasic-errorHandling.JPG" width="50%">
