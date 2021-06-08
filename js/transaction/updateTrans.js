let data = null
const bodyElement = {
    tableBody: document.getElementById('data_table_body'),
    inputAmount: document.getElementById('amount'),
    tareaDesc: document.getElementById('description'),
    submitButton: document.getElementById('submitButton'),
    selectTag: document.getElementById('category_select')
}

async function getData(){
    try{
        let response = await fetch('http://localhost:3000/transaction')
        if(response.ok){
            data = await response.json()
        }
    }catch (e) {
        console.log(`Error: status ${e.message}`)
    }
}

getData().then(()=> {
    for (let i = 0; i < data.data.length; i++) {
        let td_category = document.createElement('td')
        td_category.innerText = `${data.data[i].category.name}`
        let td_amount = document.createElement('td')
        td_amount.innerText = `${data.data[i].amount}`
        let td_datecreated = document.createElement('td')
        td_datecreated.innerText = `${data.data[i].details}`
        let td_action = document.createElement('td')
        let button_div = document.createElement('div')

        let buttonUpdate = document.createElement('button')
        buttonUpdate.value = `${data.data[i]._id}`
        buttonUpdate.className = 'btn btn-primary btn-sm m-1'
        buttonUpdate.innerText = 'update'
        buttonUpdate.setAttribute('type', 'button')
        let tr_tag = document.createElement('tr')
        button_div.appendChild(buttonUpdate)
        td_action.appendChild(button_div)
        tr_tag.append(td_category, td_amount, td_datecreated, td_action)
        bodyElement.tableBody.append(tr_tag)
    }
});

bodyElement.tableBody.addEventListener('click',(e)=>{
    if(e.target.type === 'button'){
        fillForm(e.target.value)
    }
})

async function fillForm(id){
    try{
        const response = await fetch('http://localhost:3000/transaction/'+id, {
            method: 'GET'
        })
        if(response.ok){
            let data = await response.json();
            bodyElement.inputAmount.value = data.data.amount
            bodyElement.tareaDesc.innerText = data.data.details
            bodyElement.submitButton.setAttribute('value', id)
        }
    }catch (e) {
        console.log(e)
    }
}

async function getDataCategory(){
    try{
        const response = await fetch('http://localhost:3000/category',{
            method: 'GET'
        })
        if (response.ok){
            categoriesData = await response.json()
            for (let i = 0; i < categoriesData.data.length ; i++) {
                let cat = document.createElement('option')
                cat.setAttribute('value', `${categoriesData.data[i]._id}`)
                cat.innerText = `${categoriesData.data[i].name}`
                bodyElement.selectTag.appendChild(cat)
            }
        }
    }catch (e) {
        alert(e.message)
    }
}

getDataCategory().then(()=>{
    console.log("Populated")
})

document.addEventListener('submit', async (e)=>{
    if(e.target.type){
        try{
            let form = e.target
            let formData = new FormData(form)
            e.preventDefault()
            $.ajax({
                url: 'http://localhost:3000/transaction/' + bodyElement.submitButton.value,
                type: 'PUT',
                data: {
                    details: formData.get('description'),
                    amount: formData.get('amount'),
                    isExpense: formData.get('type'),
                    category: bodyElement.selectTag.value
                },
                success: function (result, status, xhr){
                    window.location = "http://localhost/transaction-manager/index.html"
                }
            })
        }catch (e) {
            alert(e.message)
        }
    }
})



