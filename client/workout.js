const pickExercise = document.getElementById('exercise-list-btn')
const exerciseValue = document.getElementById('exercise-list')
const URL = `http://localhost:5432/live-fitness/workout`


window.onload = function (e) {
    document.getElementById('workout-name').innerHTML =
        window.localStorage.getItem('workoutName')
    let hr = 0;let min = 0;let sec = 0;
    function timer(){
        sec = parseInt(sec);min = parseInt(min);hr = parseInt(hr);sec = sec + 1;
        if (sec === 60) {min = min + 1;sec = 0;}
        if (min === 60) {hr = hr + 1;min = 0;sec = 0;}
        if (sec < 10 || sec === 0) {sec = '0' + sec;}
        if (min < 10 || min === 0) {min = '0' + min;}
        if (hr < 10 || hr === 0) {hr = '0' + hr;}
        document.getElementById('time-text').innerHTML =
            hr + ':' + min + ':' + sec;
        setTimeout(timer, 1000)
    }
    timer()
}

function toggleList(){
    const list = document.getElementById('pick-exercise')
    list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none';
}

pickExercise.addEventListener('click', ()=>{
    const list = document.getElementById('pick-exercise')
    list.style.display = 'block'
})

exerciseValue.addEventListener('click', addExercise)

function addExercise(e){
    e.preventDefault()
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let innerDiv = document.createElement('div');
    let button = document.createElement('button');
    div.id = 'exercise'
    h2.id = 'exercise-name'; h2.textContent = e.target.id;
    innerDiv.id = 'add-set';
    button.id = 'add-set-btn'; button.innerHTML = 'Add Set'
    div.appendChild(h2)
    div.appendChild(innerDiv)
    div.appendChild(button)
    document.getElementById('add-exercise-block').appendChild(div)
    let workoutName = document.getElementById('workout-name')
    console.log(h2.innerHTML)

    toggleList()

    let body = {
        workoutName: workoutName.innerHTML,
        exerciseName: h2.innerHTML,
        sets: 0
    }

    axios.post(URL, body)
        .then(res =>{
            console.log(res.data)
        }).catch(err => console.log(err))

}



