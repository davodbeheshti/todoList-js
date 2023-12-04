const title = document.querySelector('#title');
const description = document.querySelector('#description');
const btnSubmit = document.querySelector('.btn-submit');
const btnDropdown = document.querySelector('#dropdown-btn');
const tableTag = document.querySelector('#table tbody');
let taskList = [];

document.addEventListener('DOMContentLoaded', () => {
    taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.map(x => {
        table(x);
    })
})


tableTag.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('fa-trash')) {
        removeRow(e)
    } else if (e.target.classList.contains('fa-pencil')) {
        editRow(e)
    }

})

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.id) {

    } else {
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
            localStorage.setItem('taskList' , JSON.stringify(taskList));
        } else {
            alert('please enter title');
        }
    }

})

function table(objModel) {
    let thRow = createTag('th', 1);
    let tdTitle = createTag('td', objModel.title);
    let tdOperation = document.createElement('td');
    ////////////////
    let iconPencil = document.createElement('i');
    iconPencil.classList = 'fa fa-pencil text-warning'
    iconPencil.setAttribute('id', objModel.id);

    let iconTrash = document.createElement('i');
    iconTrash.classList = 'fa fa-trash text-danger ms-3';
    iconTrash.setAttribute('id', objModel.id);


    tdOperation.append(iconPencil);
    tdOperation.append(iconTrash);
    //////
    let tdDescription = createTag('td', objModel.description);
    let tdStatus = createTag('td', 'status');
    let tr = document.createElement('tr');
    tr.appendChild(thRow);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdStatus);
    tr.appendChild(tdOperation);
    tableTag.append(tr);
}

function createTag(nameTag, value) {
    const tag = document.createElement(nameTag);
    tag.innerText = value;
    return tag;
}

const removeRow = (e) => {
    e.target.parentElement.parentElement.remove();
    taskList = taskList.filter(f => f.id !== +e.target.id)
}

const editRow = (e) => {
    // btnSubmit
    console.log(e.target.id);
    const row = taskList.find(f => f.id === +e.target.id);
    title.value = row.title;
    description.value = row.description;
    btnSubmit.innerText = "Edit"
    btnSubmit.setAttribute('id', row.id);
}