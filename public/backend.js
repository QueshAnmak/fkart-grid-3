let myData = {};

async function getResponseFromAPI()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://teamop.winoff.ml/users');
    // xhr.responseType = 'json';
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://teamop.winoff.ml');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
    xhr.send();
    xhr.onload = function() {
        if (xhr.status != 200) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } 
      };
      
      xhr.onprogress = function(event) {
            myData = JSON.parse(this.response);
            console.log("Successfully Fetched Data !");
            console.log(myData);
            printAllData();
      };

      xhr.onerror = function() {
        console.log("Request Failed to load! Source Down");
      }
}

async function printAllData()
{
  let tableRef = document.getElementById('table-body');

  for(let row = 0; row < myData['data'].length; row++)
  {
    let newRow = tableRef.insertRow(-1);

    for(let cols = 0; cols < 7; cols++)
    {
        let newCell = newRow.insertCell(cols);
        let key = Object.keys(myData['data'][row])[cols]
        let newText = document.createTextNode(myData['data'][row][key]);
        newCell.appendChild(newText);
    }
  }
}

function insertIntoHTML(){
  var col = [];
}

getResponseFromAPI();


document.getElementById("id_of_textbox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      let search = document.getElementById("id_of_textbox")
      if(search.value.length > 2)
      {
          console.log("Call the search function ! I am passing the value in search box with a check");
          
          fetch(`/data?search=${search.value}`).then(function(response) {
            response.json().then(function(data) {
              console.log(data);
              myData = data;
              let tableRef = document.getElementById('table-body');
              tableRef.innerHTML = "";
              printAllData();
            })
          });
      }
      else
      console.log("Provide atleast 3 chars");
    }
});