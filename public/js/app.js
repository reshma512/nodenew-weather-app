console.log("testing no 1")
console.log("succusfully pushed the code")

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
      console.log(data)
    })
})

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value




    messageOne.textContent='loading...'
    messageTwo.textContent=''
 console.log(location)
 fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
           // console.log(data.error)
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
           
        }
        
    })
})
})