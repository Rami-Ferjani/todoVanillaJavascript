var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var all = document.getElementById("all");
var completed = document.getElementById("completed");
var uncompleted = document.getElementById("uncompleted");
var itemNumber = document.getElementById("itemNumber");

completed.addEventListener("click", completedItems);
all.addEventListener("click", allItems);
uncompleted.addEventListener("click", uncompletedItems);
form.addEventListener("submit", addItem);
let number = 0;
itemList.addEventListener("click", removeItem);

filter.addEventListener("keyup", filterItems);

itemList.addEventListener("click", function (e) {
  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    checkItem(e);
  } else {
    removeItem(e);
  }
});

function completedItems(e) {
  number = 0;

  console.log("filterItems function called");
  var items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    if (item.classList.contains("marked")) {
      item.style.display = "block";
      number++;
    } else {
      item.style.display = "none";
    }
  });
  itemNumber.innerHTML = `${number} items`;
}

function uncompletedItems(e) {
  console.log("filterItems function called");
  number = 0;
  var items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    if (!item.classList.contains("marked")) {
      item.style.display = "block";
      number++;
    } else {
      item.style.display = "none";
    }
  });
  itemNumber.innerHTML = `${number} items`;
}

function allItems(e) {
  number = 0;
  console.log("filterItems function called");
  var items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    item.style.display = "block";
    number++;
  });
  itemNumber.innerHTML = `${number} items`;
}
function addItem(e) {
  e.preventDefault();
  /* const itemInput = document.querySelector("#item").value;
  const list = document.querySelector(".list-group").innerHTML;
  const list2 =
    list + `<li class='list-group-item'>${itemInput}  <button>X</button></li>`;
  document.querySelector(".list-group").innerHTML = list2;

  console.log(itemInput);*/
  var newItem = document.getElementById("item").value;

  var li = document.createElement("li");

  li.className = "list-group-item";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  li.appendChild(checkbox);

  li.appendChild(document.createTextNode(newItem));

  li.addEventListener("dblclick", function () {
    editListItem(li);
  });

  var deleteBtn = document.createElement("button");

  deleteBtn.className = "btn btn-danger btn-sm float-right delete";

  deleteBtn.appendChild(document.createTextNode("X"));

  li.appendChild(deleteBtn);

  itemList.appendChild(li);
  number++;
  itemNumber.innerHTML = `${number} items`;
}
itemNumber.innerHTML = `${number} items`;
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    itemList.removeChild(li);
  }
}

function checkItem(e) {
  e.target.parentElement.classList.toggle("marked");
  console.log(e.target.parentElement.classList);
}

function filterItems(e) {
  console.log("filterItems function called");

  var text = e.target.value.toLowerCase();

  var items = itemList.getElementsByTagName("li");

  Array.from(items).forEach(function (item) {
    console.log("item working");

    var itemName = item.querySelector("span")
      ? item.querySelector("span").textContent
      : item.textContent;

    console.log(itemName);

    if (itemName.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function editListItem(item) {
  var input = document.createElement("input");
  input.type = "text";
  input.value = item.textContent.trim();
  item.innerHTML = "";
  item.appendChild(input);
  input.focus();

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  var textContent = document.createElement("span");
  var deleteBtn = document.createElement("button");
  var doneBtn = document.createElement("button");

  textContent.textContent = input.value.trim();

  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  deleteBtn.appendChild(document.createTextNode("X"));

  doneBtn.className = "btn done";
  doneBtn.appendChild(document.createTextNode("ٍ"));

  item.appendChild(checkbox);
  item.appendChild(textContent);
  item.appendChild(deleteBtn);

  input.addEventListener("blur", function () {
    textContent.textContent = input.value.trim();
    item.innerHTML = "";
    item.appendChild(checkbox);
    item.appendChild(textContent);
    item.appendChild(deleteBtn);

    item.addEventListener("dblclick", function () {
      editListItem(item);
    });
  });

  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      input.blur();
    }
  });
}
