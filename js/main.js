const title = document.querySelector('#title');
const description = document.querySelector('#description');
const btnSubmit = document.querySelector('#btn-submit');
const btnDropdown = document.querySelector('#dropdown-btn');
const tableTag = document.querySelector('#table tbody');
let taskList = [];


tableTag.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('fa-trash')) {
        e.target.parentElement.parentElement.remove();
        taskList = taskList.filter(f => f.id !== +e.target.id)
        console.log(taskList);

    }

})


btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const objModel = {};
    if (title.value) {
        objModel.title = title.value;
        objModel.description = description.value;
        objModel.id = Math.round(Math.random() * 10000);
        taskList.push(objModel);
        title.value = ''
        description.value = ''
        ///////////////////////////
        table(objModel);
    } else {
        alert('please enter title');
    }

    console.log(taskList);

})

function table(objModel) {
    let thRow = createTag('th', 1);
    let tdTitle = createTag('td', objModel.title);
    let tdOperation = document.createElement('td');
    ////////////////
    let iconTrash = document.createElement('i');
    iconTrash.classList = 'fa fa-trash text-danger ms-3';
    iconTrash.setAttribute('id', objModel.id);

    let iconPencil = document.createElement('i');
    iconPencil.classList = 'fa fa-pencil text-warning'
    iconTrash.setAttribute('id', objModel.id);

    tdOperation.append(iconTrash)
    tdOperation.append(iconPencil)
    //////
    let tdDescription = createTag('td', objModel.description);
    let tdStatus = createTag('td', 'status');
    let tr = document.createElement('tr');
    tr.appendChild(thRow)
    tr.appendChild(tdTitle)
    tr.appendChild(tdDescription)
    tr.appendChild(tdStatus)
    tr.appendChild(tdOperation)
    tableTag.append(tr);
}


function createTag(nameTag, value) {
    const tag = document.createElement(nameTag);
    tag.innerText = value;
    return tag;
}