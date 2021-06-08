const bodyElements = {
    formDiv: document.getElementById('form_div'),
    listDiv: document.getElementById('list_div'),
    accordionDiv: document.getElementById('accordion'),
    nameHolder: document.getElementById('name_holder'),
    descriptionHolder: document.getElementById('description_holder'),
    updateBtn: document.getElementById('update-category')
}

function createAccordion(data, idx) {
    let accordionCard = document.createElement('div')
    accordionCard.className = 'card m-1';
    let innerDiv = document.createElement('div')
    innerDiv.className = 'card-header'
    innerDiv.id = `head-${idx}`
    let h5Element = document.createElement('h5')
    h5Element.className = 'mb-0'
    let buttonElement = document.createElement('button')
    buttonElement.className = 'btn btn-link collapsed'
    buttonElement.setAttribute('data-toggle', 'collapse')
    buttonElement.setAttribute('data-target', `#${data._id}`)
    buttonElement.setAttribute('aria-controls', `${data._id}`)
    buttonElement.setAttribute('aria-expanded', 'false')
    buttonElement.innerText = data.name
    h5Element.appendChild(buttonElement)
    innerDiv.append(h5Element)
    accordionCard.append(innerDiv)

    let wrapperDiv = document.createElement('div')
    wrapperDiv.className = 'show collapse'
    wrapperDiv.id = `${data._id}`
    wrapperDiv.setAttribute('aria-labelledby', `head-${idx}`)
    wrapperDiv.setAttribute('data-parent', '#accordion')
    let bodyDiv = document.createElement('div')
    bodyDiv.className = 'card-body'
    bodyDiv.textContent = data.description

    let buttonDiv = document.createElement('div')
    buttonDiv.className = 'ml-auto'
    let removeButton = document.createElement('button')
    removeButton.className = 'btn btn-sm btn-danger m-1'
    removeButton.innerText = 'remove'
    removeButton.setAttribute('value', `${data._id}`)
    removeButton.setAttribute('type', 'reset')
    let updateButton = document.createElement('button')
    updateButton.className = 'btn btn-sm btn-warning m-1'
    updateButton.innerText = 'update'
    updateButton.setAttribute('type', 'button')
    updateButton.setAttribute('value', `${data._id}`)
    wrapperDiv.appendChild(bodyDiv)
    wrapperDiv.appendChild(document.createElement('hr'))
    buttonDiv.appendChild(updateButton)
    buttonDiv.appendChild(removeButton)
    wrapperDiv.appendChild(buttonDiv)
    accordionCard.appendChild(wrapperDiv)
    return accordionCard
}

let category_list = null;

async function getData() {
    try {
        let response = await fetch('http://localhost:3000/category')
        if (response.ok) {
            category_list = await response.json()
            for (let i = 0; i < category_list.data.length; i++) {
                bodyElements.accordionDiv.append(createAccordion(category_list.data[i], i))
            }
        }
    } catch (e) {
        alert(e.message)
    }
}

getData().then(() => console.log("done"))

bodyElements.accordionDiv.addEventListener('click', (e) => {
    if (e.target.type === 'reset') {
        try {
            $.ajax({
                url: 'http://localhost:3000/category/' + e.target.value,
                type: 'DELETE',
                data: {},
                success: window.location = 'http://localhost//transaction-manager//categories.html',
            })
        } catch (e) {
            console.log("Problems")
        }
    } else if (e.target.type === 'button') {
        forUpdateBtn(e.target.value)
    }
})

async function forUpdateBtn(id) {
    console.log('Function Called!')
    let previousVal = null
    try {
        let response = await fetch('http://localhost:3000/category/' + id, {
            method: 'POST'
        })
        if (response.ok) {
            previousVal = await response.json()
        }

    } catch (e) {
        alert("Cannot get Value.")
        return null;
    }

    bodyElements.nameHolder.value = previousVal.data.name
    bodyElements.descriptionHolder.innerText = previousVal.data.description
    bodyElements.updateBtn.setAttribute('value', id)
}

document.addEventListener('submit', (e) => {
    const form = e.target
    console.log('called!!')
    e.preventDefault();
    let id = bodyElements.updateBtn.value
    if (id) {
        let dataForm = new FormData(form)
        $.ajax({
            url: 'http://localhost:3000/category/' + id,
            method: 'PUT',
            data: {
                name: dataForm.get('name'),
                description: dataForm.get('description')
            },
            success: function (result, status, xhr) {
                window.location = 'http://localhost/transaction-manager/categories.html'
            }
        })

    }
})