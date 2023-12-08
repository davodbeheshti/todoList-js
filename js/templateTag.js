export const templateAlert = (typeAlert, message) => {
    // const divAlert = document.createElement(`<div class="alert ${typeAlert}" role="alert">${message}</div>`)
    const divAlert = document.createElement(`div`);
    const buttonDismis = document.createElement('button');
    buttonDismis.classList = 'btn-close'
    buttonDismis.setAttribute('data-bs-dismiss' , 'alert');
    divAlert.classList = `alert ${typeAlert} alert-dismissible fade show`
    divAlert.innerText = message;
    divAlert.appendChild(buttonDismis)
    document.body.append(divAlert)
};

export const fieldRequired = () => {
    const tagB = document.createElement('b');
    tagB.classList = 'text-danger';
    const tagSmall = document.createElement('small');
    tagSmall.innerText = 'This field is required';
    tagB.appendChild(tagSmall);
    return tagB;
}