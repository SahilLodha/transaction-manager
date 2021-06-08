let bodyElements = {
    selectTag: document.getElementById('category_select')
}

let categoriesData = null

async function getData(){
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
                bodyElements.selectTag.appendChild(cat)
            }
        }
    }catch (e) {
        alert(e.message)
    }
}

getData().then(e=>{
    console.log(bodyElements.selectTag)
})

document.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = e.target
    let formData = new FormData(form)
    console.log(formData.get('category'), formData.get('type'))
    $.ajax({
        url: 'http://localhost:3000/transaction',
        method: 'POST',
        data: {
            amount: Number(formData.get('amount')),
            details: formData.get('description'),
            isExpense: formData.get('type'),
            category: formData.get('category')
        },
        success: function (result, status, xhr){
            window.location = 'http://localhost/transaction-manager/index.html'
        }
    })
})

