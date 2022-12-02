document.getElementById('saveItemInList').addEventListener('click', addItemToList);
document.getElementById('openListModal').addEventListener('click', resetInputBorder);

let list = [];
let completedList = [];
let deletedList = [];
const PATTERN = /^[a-zA-z\d\.\,\!\s]+$/;  // Pattern allows a-zA-Z and . , ! (spaces)

let itemName =  document.getElementById('listName');
let itemDescription = document.getElementById('listDescription');

let listContainer = document.getElementById('listContainer');
let completedBody = document.getElementById('completedBody');
let deletedBody = document.getElementById('deletedBody');

let closeButton = document.getElementById('closeModalButton');

function addItemToList() {
      
      let name = itemName.value;
      let description = itemDescription.value;

      if(validateData(name, description)) { return }

      let toDo = {id: list.length + 1 ,name: name , description: description};
      itemName.value = '';
      itemDescription.value = '';

      list.push(toDo);
      insertListInHTML();
      closeButton.click();

      console.log(list);
}

function validateData(name, description) {

      let resultName = PATTERN.test(name);
      let resultDescription = PATTERN.test(description);

      !resultName ? itemName.className = 'form-control border border-danger' : itemName.className = 'form-control border-success';
      !resultDescription ? itemDescription.className = 'form-control border border-danger' : itemDescription.className = 'form-control border-success';

       if (!resultName || !resultDescription) return true;

       return false;
}

function resetInputBorder() {
      itemName.className = 'form-control border';
      itemDescription.className = 'form-control border';
}


function insertListInHTML() {

      listContainer.innerHTML = "";
      completedBody.innerHTML = "";
      deletedBody.innerHTML = "";

      list.map(item => {

            let card = createCardElement(item,false);

            listContainer.append(card);
      });

      completedList.map(item => {

            let card = createCardElement(item, true);
            completedBody.append(card);
      });

      deletedList.map(item => {

            let card = createCardElement(item, true);
            deletedBody.append(card);
      });
}

/*
* <div class="card m-2" style="width: 18rem;">
*      <div class="card-body">
*            <h5 class="card-title border-bottom pb-2">ITEM NAME</h5>
*            <p class="card-text border-bottom pb-2">ITEM DESCRIPTION</p>
*            <div class="container w-100 d-flex justify-content-between p-0">
*            <a href="#" class="btn btn-success w-25"><i class="bi bi-check"></i></a>
*            <a href="#" class="btn btn-danger w-25"><i class="bi bi-x"></i></a>
*            </div>
*      </div>
* </div>
*
*  RESULT OF THIS FUNCTION IS ^
*/
function createCardElement(item, boolean) {

      let card = document.createElement('div');
      card.className = 'card border-primary m-2';
      card.style.width = '18rem';

      let cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      let cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title border-bottom pb-2';
      cardTitle.innerHTML = item.name;

      let cardDescription = document.createElement('p');
      cardDescription.className = 'card-text border-bottom pb-2';
      cardDescription.innerHTML = item.description;

      let cardButtons = document.createElement('div');
      cardButtons.className = 'container w-100 d-flex justify-content-between p-0';

      let cardButtonOne = document.createElement('button');
      cardButtonOne.className = 'btn btn-success w-25';
      cardButtonOne.value = item.id;
      cardButtonOne.disabled = boolean;
      cardButtonOne.addEventListener('click', completeTask);
      

      let cardButtonTwo = document.createElement('button');
      cardButtonTwo.className = 'btn btn-danger w-25';
      cardButtonTwo.value = item.id;
      cardButtonTwo.disabled = boolean;
      cardButtonTwo.addEventListener('click', deleteTask)
   

      let cardIconOne = document.createElement('i');
      cardIconOne.className = 'bi bi-check';

      let cardIconTwo = document.createElement('i');
      cardIconTwo.className = 'bi bi-x';

      cardButtonTwo.append(cardIconTwo);

      cardButtonOne.append(cardIconOne);

      cardButtons.append(cardButtonOne);
      cardButtons.append(cardButtonTwo);

      cardBody.append(cardTitle);
      cardBody.append(cardDescription);
      cardBody.append(cardButtons);

      card.append(cardBody);

      return card;
}

function completeTask(triggeredCard) {

      let buttonPressed = triggeredCard.target;

      list.forEach((element, index) => {
            if (element.id === parseInt(buttonPressed.value)) {

                  completedList.push(element);
                  list.splice(index, 1);
            }
      });

      insertListInHTML();
}

function deleteTask(triggeredCard) {

      let buttonPressed = triggeredCard.target;

      list.forEach((element, index) => {

            if (element.id === parseInt(buttonPressed.value)) {

                   deletedList.push(element)
                   list.splice(index, 1);
                  }
      });

      insertListInHTML();
}
