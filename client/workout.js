const pickExercise = document.getElementById('exercise-list-btn')
const exerciseValue = document.getElementById('exercise-list')
const URL = `http://localhost:5432/live-fitness`


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
    div.innerHTML = e.target.id; div.id = 'exercise'


    toggleList()

    // let body = {
    //     name: name.value,
    //     workoutName: workoutName.value
    // }
    //
    // axios.post(URL, body)
    //     .then(res =>{
    //         console.log(res.data)
    //     }).catch(err => console.log(err))

}



