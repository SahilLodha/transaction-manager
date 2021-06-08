let data = null
const bodyElement = {
    tableBody: document.getElementById('data_table_body')
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

window.addEventListener('button', (e)=>{
    alert(e.target)
})

getData().then(()=>{
    for (let i = 0; i < data.data.length ; i++) {
        let td_category = document.createElement('td')
        td_category.innerText = `${data.data[i].category.name}`
        let td_amount = document.createElement('td')
        td_amount.innerText = `${data.data[i].amount}`
        let td_datecreated = document.createElement('td')
        td_datecreated.innerText = `${data.data[i].createdAt}`
        let td_description = document.createElement('td')
        td_description.innerText = `${data.data[i].details}`
        let td_action = document.createElement('td')
        let button_div = document.createElement('div')

        let button_remove = document.createElement('button')
        button_remove.value = `${data.data[i]._id}`
        button_remove.className = 'btn btn-danger btn-sm m-1'
        button_remove.innerText = 'remove'
        button_remove.setAttribute('type', 'reset')
        let tr_tag = document.createElement('tr')

        button_div.appendChild(button_remove)
        td_action.appendChild(button_div)

        tr_tag.append(td_category, td_amount, td_datecreated, td_description, td_action)
        bodyElement.tableBody.append(tr_tag)
    }
});

bodyElement.tableBody.addEventListener('click', async (e)=>{
    if(e.target.type){
        try{
            $.ajax({
                url: 'http://localhost:3000/transaction/remove/' + e.target.value,
                type: 'POST',
                data: {},
                success: function (result, status, xhr){
                    window.location = "http://localhost/transaction-manager/index.html"
                }
            })
        }catch (e) {
            alert(e.message)
        }
    }
})



