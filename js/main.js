import { templateAlert, fieldRequired } from "./templateTag.js";

const title = document.querySelector('#title');
const description = document.querySelector('#description');
const btnSubmit = document.querySelector('.btn-submit');
const btnDropdown = document.querySelector('#dropdown-btn');
const tableTag = document.querySelector('#table tbody');
const dropdownMenu = document.querySelector('.dropdown-menu');
const inputTitle = document.querySelector('.input-title');
const inputDropdown = document.querySelector('.input-dropdown');
let taskList = [];
let dropdownStatus;
let validInputTitle = false;

document.addEventListener('DOMContentLoaded', () => {
    taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.map((item, index) => {
        item.row = index + 1;
        table(item);
    })
})

dropdownMenu.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
        btnDropdown.innerText = e.target.innerText;
        dropdownStatus = e.target.innerText;
        inputDropdown.children[1].remove()
    }
})

title.addEventListener('input', (e) => {
    if (!e.target.value) {
        inputTitle.append(fieldRequired())
        validInputTitle = false;
    } else {
        if (!validInputTitle) {
            inputTitle.children[1].remove();
            validInputTitle = true;
        }
    }
})

tableTag.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('fa-trash')) {
        eventRemoveRow(e)
    } else if (e.target.classList.contains('fa-pencil')) {
        editRow(e)
    }
})

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (title.value && dropdownStatus) {
        if (e.target.id) {
            submitEventEditRow(e);
        } else {
            submitEventAddRow();
        }
    }

})

function table(objModel) {
    let thRow = createTag('th', objModel.row);
    let tdTitle = createTag('td', objModel.title);
    let tdOperation = document.createElement('td');
    ////////////////
    let iconPencil = document.createElement('i');
    iconPencil.classList = 'fa fa-pencil icon text-warning'
    iconPencil.setAttribute('id', objModel.id);

    let iconTrash = document.createElement('i');
    iconTrash.classList = 'fa fa-trash icon text-danger ms-3';
    iconTrash.setAttribute('id', objModel.id);

    tdOperation.append(iconPencil);
    tdOperation.append(iconTrash);
    //////
    let tdDescription = createTag('td', objModel.description);
    let tdStatus = createTag('td', objModel.status);
    let tr = document.createElement('tr');
    tr.appendChild(thRow);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdStatus);
    tr.appendChild(tdOperation);
    tr.setAttribute('id', objModel.id);
    tableTag.append(tr);
}

function createTag(nameTag, value) {
    const tag = document.createElement(nameTag);
    tag.innerText = value;
    return tag;
}

const eventRemoveRow = (e) => {
    e.target.parentElement.parentElement.remove();
    taskList = taskList.filter(f => f.id !== +e.target.id)
    localStorage.setItem('taskList', JSON.stringify(taskList))
    templateAlert('alert-success', 'remove success fully')
}

const editRow = (e) => {
    const row = taskList.find(f => f.id === +e.target.id);
    title.value = row.title;
    description.value = row.description;
    btnDropdown.innerText = row.status || 'Status';
    dropdownStatus = row.status;
    btnSubmit.innerText = "Edit"
    inputDropdown.children[1].remove()
    inputTitle.children[1].remove();
    btnSubmit.setAttribute('id', row.id);
}

const submitEventEditRow = (e) => {
    const row = taskList.find(x => x.id === +e.target.id);
    row.title = title.value;
    row.description = description.value;
    row.status = dropdownStatus;
    btnSubmit.innerText = "Add"
    title.value = '';
    description.value = '';
    btnDropdown.innerText = "Status";
    dropdownStatus = '';
    localStorage.setItem('taskList', JSON.stringify(taskList)); // localStorage update
    inputTitle.append(fieldRequired())
    inputDropdown.append(fieldRequired())
    templateAlert('alert-success', 'edit success fully')
    console.log(tableTag.children);
    for (let item of tableTag.children) {
        if (item.id === e.target.id) {
            item.children[1].innerText = row.title;
            item.children[2].innerText = row.description;
            item.children[3].innerText = row.status;
        }
    }
    btnSubmit.setAttribute('id', null);
}

const submitEventAddRow = () => {
    const objModel = {};
    objModel.title = title.value;
    objModel.status = dropdownStatus;
    objModel.description = description.value;
    objModel.row = taskList.length + 1;
    objModel.id = Math.round(Math.random() * 10000);
    taskList.push(objModel);
    title.value = '';
    description.value = '';
    btnDropdown.innerText = "Status";
    dropdownStatus = '';
    table(objModel);
    localStorage.setItem('taskList', JSON.stringify(taskList)); //////////// adding to localStorage
    inputTitle.append(fieldRequired())
    inputDropdown.append(fieldRequired())
    templateAlert('alert-success', 'adding success fully')
}