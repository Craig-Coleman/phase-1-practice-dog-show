 document.addEventListener('DOMContentLoaded', () => {

    let form = document.querySelector('#dog-form');
    let submitBtn = document.querySelector('#dog-form')[3]
    let table = document.querySelector('#table-body')

    
    //Fetch Dogs from API
    document.addEventListener('DOMContentLoaded', getDogs())
    function getDogs () {
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(data => appendDogs(data))
    }

    function appendDogs(dogs) {
        for (let i = 0; i < dogs.length; i++) {
            //Build Dog Object
            let dogObj = {
                name: dogs[i].name, 
                breed: dogs[i].breed,
                sex: dogs[i].sex,
                id: dogs[i].id
            }
            
            //Create Dog Elements
            let tableRow = document.createElement('tr');
            let tableName = document.createElement('td');
            let tableBreed = document.createElement('td');
            let tableSex = document.createElement('td');
            //Append Dog Elements to DOM
            table.appendChild(tableRow);
            tableRow.appendChild(tableName);
            tableRow.appendChild(tableBreed);
            tableRow.appendChild(tableSex);
            //Set Initial Text Values
            tableName.textContent = dogObj.name;
            tableBreed.textContent = dogObj.breed;
            tableSex.textContent = dogObj.sex
            //Edit Button Function
            let editButton = document.createElement('BUTTON')
            editButton.textContent = 'Edit Dog'
            editButton.addEventListener('click', () => {
                form.name.value = dogObj.name;
                form.breed.value = dogObj.breed;
                form.sex.value = dogObj.sex
                form.setAttribute('id', dogObj.id)
            })
            tableRow.appendChild(editButton)
        }
           //Submit Button Patch
           form.addEventListener('submit', (event) => {
               event.preventDefault()
            let patchObj = {
                name: form.name.value,
                breed: form.breed.value,
                sex: form.sex.value
            }
            fetch(`http://localhost:3000/dogs/${form.id}`, {
                method: 'PATCH',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchObj)
            }).then(res => res.json())
            table.querySelectorAll('tr').forEach(n => n.remove())
            fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(data => appendDogs(data))
        })

    }
})