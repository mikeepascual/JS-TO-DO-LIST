//inputs
let taskInp = document.querySelector("#task");
let date = document.querySelector("#date");

//button
let taskBtn = document.querySelector("#taskBtn");

let toDo = JSON.parse(localStorage.getItem("entries"));

let getId = localStorage.getItem("id")

let taskList = document.querySelector("#taskList ")
let id ;

// check if getId is null < getId will reasign value 0 to getId>
// else get the current id in the localStorage
if(getId == null) {
    localStorage.setItem("id",0)
    id = 0
}else {
    id = localStorage.getItem("id")
}               

// if page is reloaded
// if no task <p class= "noTask">No task</p> will display in the table element
// else display all task in the table from localstorage
if(toDo == null) {
    toDo = []
    taskList.innerHTML = `<tr><p class= "noTask">No task</p></tr>`
} else if (toDo == '') {
    taskList.innerHTML = `<tr><p class= "noTask">No task</p></tr>`
}
  else {
let data = ''

//loop each item from toDo array and display one by one in the Table

toDo.forEach(x => {
    data +=`
    <tr>
    <td class="${x.isDone ? 'done': ''}">${x.task}</td>
    <td>${x.date}</td>
    <td><button data-id="${x.id}" class="removeBtn" onclick="removeBtn('${x.id}')">Remove</button>
    <button type="button" onclick="markDone('${x.id}')">Done</button></td>
    </tr>
    `
});
taskList.innerHTML=data
}

let removeButtons;
// the add task button
taskBtn.addEventListener("click",() =>{


    let toDoList = JSON.parse(localStorage.getItem("entries"));
    let taskList = document.querySelector("#taskList ")
        
    // check if toDoList value == null it change the value to array
    if(toDoList == null) {
        toDoList     = []
    } 
    if(document.getElementsByClassName("noTask")[0]) {
        document.getElementsByClassName("noTask")[0].style.display = "none"
    }
    let Id =  localStorage.getItem("id")
    localStorage.setItem("id",parseInt(Id) + 1)

    //task object 

    let task = { 
        task: taskInp.value, 
        date: date.value,
        isDone:false,
        id: Id
    }
    
    toDoList.push(task)

    // save task in the localStorage

    localStorage.setItem("entries",JSON.stringify
    (toDoList))

    // display all task from  localStorage in the Table
    let data = ''
    toDoList.forEach(x => {
    data += `
    <tr>
    <td class="${x.isDone ? 'done': ''}">${x.task}</td>
    <td>${x.date}</td>
    <td><button data-id="${x.id}" class="removeBtn" onclick="removeBtn('${x.id}')">Remove</button>
    <button type="button" onclick="markDone('${x.id}')">Done</button></td>
    </tr>
    `
    
})
taskList.innerHTML=data
})


//filter all task that is not equal to the idrem parameter 
// save the new  filtered task in the localStorage
//  remove item from list 
function removeBtn(idrem) {
    let toDoList = JSON.parse(localStorage.getItem("entries"));
            let newTodo = toDoList.filter(x => {
                return parseInt(x.id) !== parseInt(idrem) 
            })
           localStorage.setItem("entries",JSON.stringify(newTodo));
    
           let data = ''
           newTodo.forEach(x => {
           data += `
               <tr>
               <td class="${x.isDone ? 'done': ''}">${x.task}</td>
               <td>${x.date}</td>
               <td>
               <button data-id="${x.id}" class="removeBtn" onclick="removeBtn('${x.id}')">Remove</button>
               <button type="button" onclick="markDone('${x.id}')">Done</button></td>
               </tr>
           `
           
       })
       taskList.innerHTML=data

        if (newTodo == '') {
        taskList.innerHTML = `<tr><p class= "noTask">No task</p></tr>`
    }
}

// add 


// change the selected task isDone property to true and add line through to the element
function markDone (param) {

    let toDoList = JSON.parse(localStorage.getItem("entries"));

    let todoIndex = toDoList.findIndex(x => {
        return x.id == param
    })
    toDoList[todoIndex].isDone = true
    localStorage.setItem("entries",JSON.stringify(toDoList))
    
    let data = ''
    toDoList.forEach(x => {
    data += `
        <tr>
        <td class="${x.isDone ? 'done': ''}">${x.task}</td>
        <td>${x.date}</td>
        <td><button data-id="${x.id}" class="removeBtn" onclick="removeBtn('${x.id}')">Remove</button>
        <button type="button" onclick="markDone('${x.id}')">Done</button></td>
        </tr>
    `
    
})
taskList.innerHTML=data
}