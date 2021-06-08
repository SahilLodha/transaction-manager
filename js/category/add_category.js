const nameField = document.getElementById('name')
const descriptionField = document.getElementById('description')

document.addEventListener('submit', (e)=>{
    const form = e.target;
    e.preventDefault();
    let data_form  = new FormData(form)
    $.ajax({
        url: 'http://localhost:3000/category',
        type: 'POST',
        data: {
            'name': data_form.get('name'),
            'description': data_form.get('description')
        },
        success: function (result, status, xhr){
            window.location = "http://localhost/transaction-manager/categories.html"
        }
    })
})