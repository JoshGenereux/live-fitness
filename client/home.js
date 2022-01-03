const modal = document.getElementById('create-modal')
const createBtn = document.getElementById('custom-button')
const closeModal = document.getElementById('close')
const workoutInput = document.getElementById('custom-input')
const workout1 = document.getElementById('workout-btn-0')
const workout2 = document.getElementById('workout-btn-1')
const workout3 = document.getElementById('workout-btn-2')
const workout4 = document.getElementById('workout-btn-3')
const URL = `http://localhost:5432/live-fitness`

createBtn.addEventListener('click', ()=>{
    modal.style.display = "block";
})

closeModal.addEventListener('click', ()=>{
    modal.style.display = "none";
})

workoutInput.addEventListener('submit', (e)=>{
    e.preventDefault()
    let workoutName = document.getElementById('custom-input-text')
    workoutName = upperFirst(workoutName.value)
    console.log(workoutName)

    if(workoutName !== ""){
        window.localStorage.setItem('workoutName', workoutName)
        let exerciseBody = {
            exerciseName: window.localStorage.getItem('workoutName')
        }

        axios.get(URL)
            .then(res => {
                console.log(res.data)
                let count = 0;
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].exercise_name === workoutName){
                        count++;
                        alert(`${workoutName} already exists`)
                    }
                }
                if(count === 0){
                    axios.post(`${URL}/add-to-table`, exerciseBody)
                        .then(res => {
                            console.log(res.data)
                        }).catch(err => console.log(err))
                    window.open('workout.html', "_self")
                }
            })


    } else {
        alert("please type in a workout name")
    }

})

function upperFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1).trim()
}

window.onload = function (e){
    e.preventDefault()
    axios.get(URL)
        .then(res =>{
            for(let i = 0; i < 5; i++){
                let str = res.data[i].exercise_name;
                document.getElementById(`workout-btn-${i}`).innerHTML = upperFirst(str)
            }
        })
}

workout1.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[0].exercise_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})
workout2.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[1].exercise_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})
workout3.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[2].exercise_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})
workout4.addEventListener('click', ()=>{
    axios.get(URL).then(res =>{
        console.log(res.data)
        let name = res.data[3].exercise_name;
        window.localStorage.setItem('workoutName', name)
        window.open('workout.html', "_self")
    })
})

