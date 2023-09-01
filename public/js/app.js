console.log('this is client side JS')

fetch('http://localhost:3000/weather?address=Lahore').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#errorMessage')
const successMessage = document.querySelector('#successMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent = data.error
                successMessage.textContent= ''
            } else {
                errorMessage.textContent = ''
                successMessage.textContent = 'Location: ' + data.Location + ' Temprature: ' + data.Temprature
            }
        })
    })
})