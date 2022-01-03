const modal = document.getElementById('create-modal')
const createBtn = document.getElementById('custom-button')
const closeModal = document.getElementById('close')
const workoutInput = document.getElementById('custom-input')
const workout1 = document.getElementById('workout-btn-1')
const workout2 = document.getElementById('workout-btn-2')
const workout3 = document.getElementById('workout-btn-3')
const workout4 = document.getElementById('workout-btn-4')
const URL = `http://localhost:5432/live-fitness`

createBtn.addEventListener('click', ()=>{
    modal.style.display = "block";
})

closeModal.addEventListener('click', ()=>{
    modal.style.display = "none";
})

workoutInput.addEventListener('submit', (e)=>{
    e.preventDefault()
    let userInput = document.getElementById('custom-input-text')
    window.localStorage.setItem('workoutName', userInput.value)
    window.open('workout.html', "_self")
})

workoutInput.addEventListener('submit', (e)=>{
    e.preventDefault()
    let workoutName = document.getElementById('custom-input-text')
    window.localStorage.setItem('workoutName', workoutName.value)

    let body = {
        workoutName: workoutName.value
    }

    axios.post(URL, body)
        .then(res =>{
            console.log(res)
        }).catch(err =>console.log(err))
})

window.onload = function (e){
    e.preventDefault()

    axios.get(URL)
        .then(res =>{
            let last = res.data.length -1;
            console.log(res.data[last])
            document.getElementById('workout-btn-1').innerHTML = res.data[last].table_name;
            document.getElementById('workout-btn-2').innerHTML = res.data[last-1].table_name;
            document.getElementById('workout-btn-3').innerHTML = res.data[last-2].table_name;
            document.getElementById('workout-btn-4').innerHTML = res.data[last-3].table_name;
        })
}

workout1.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[res.data.length-1].table_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})
workout2.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[res.data.length-2].table_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})
workout3.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[res.data.length-3].table_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})
workout4.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[res.data.length-4].table_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})

