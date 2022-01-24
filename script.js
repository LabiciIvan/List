const wordsArray = [];

function putWordInArray() {
 let word = document.getElementById('wordToArray').value;
 if (word == "") {
   return;
 } else if (wordsArray.includes(word)) {
  document.getElementById('showUser').innerHTML = "Word is already in list";
  setTimeout(clearStats,3000);
   return;
 }
 wordsArray.push(word);
 document.getElementById('wordToArray').value = "";
 addWordsToHTML(word);
}

function searchWordsInArray() {
  let searchWord = document.getElementById('displayWord').value;
  if (searchWord == "") {
    return;
  }
  document.getElementById('displayWord').value = "";
  if (wordsArray.includes(searchWord)==true) {
    document.getElementById('showUser').innerHTML = "YES";
    setTimeout(clearStats,3000)
  } else {
    document.getElementById('showUser').innerHTML = "NO";
    setTimeout(clearStats,3000)
  }
}

function clearStats() {
  document.getElementById('showUser').innerHTML = "";
}

function addWordsToHTML(word) {
  let x = document.createElement("li");
  x.innerHTML = word;
  document.getElementById('listWords').appendChild(x);
}
