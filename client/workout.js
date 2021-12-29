const pickExercise = document.getElementById('exercise-list-btn')
const exerciseValue = document.getElementById('exercise-list')
const finish = document.getElementById('finish')
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

let count = 1;
function addExercise(e){
    e.preventDefault()
    let div = document.createElement('div');div.id = `exercise`
    let h2 = document.createElement('h2');h2.id = 'exercise-name'; h2.textContent = e.target.id;
    let innerDiv = document.createElement('div');innerDiv.id = `add-set`;
    let button = document.createElement('button');button.id = `add-set-btn`; button.innerHTML = 'Add Set'
    div.appendChild(h2);div.appendChild(innerDiv);div.appendChild(button)
    document.getElementById('add-exercise-block').appendChild(div)
    let workoutName = document.getElementById('workout-name')
    toggleList()

    let body = {
        workoutName: workoutName.innerHTML,
        exerciseName: h2.innerHTML,
        sets: 0
    }
    let removeSpace = h2.innerHTML.replace(/ /g, "_")
    let exerciseBody = {
        exerciseName: removeSpace,
    }
    axios.post(`${URL}/add-exercise`, exerciseBody)
        .then().catch(err => console.log(err))
    axios.post(URL, body)
        .then().catch(err => console.log(err))
}

document.querySelector('body').addEventListener('click', addSetBtn)
function addSetBtn(e){
    if(e.target.textContent === 'Add Set'){
        addSet()
    }
    console.log(e.target)
}
function addSet(){
    let div = document.createElement('div'); div.id = `add-set-set`
    let innerDiv1 = document.createElement('div'); innerDiv1.id = `set-set`;
    let thirdDiv1 = document.createElement('div'); thirdDiv1.id ='set-div'; thirdDiv1.textContent = `Set: `
    let setP = document.createElement('p'); setP.id = 'set-set-count'; setP.innerHTML = `${count}`
    innerDiv1.appendChild(thirdDiv1); innerDiv1.appendChild(setP);
    let innerDiv2 = document.createElement('div'); innerDiv2.id ='set-weight';
    let thirdDiv2 = document.createElement('div'); thirdDiv2.id ='weight-div'; thirdDiv2.textContent = 'Weight:'
    let input = document.createElement('input'); input.id = 'set-weight-num'; input.type = 'number';
    innerDiv2.appendChild(thirdDiv2); innerDiv2.appendChild(input);
    let innerDiv3 = document.createElement('div'); innerDiv3.id = 'set-rep';
    let thirdDiv3 = document.createElement('div'); thirdDiv3.id = 'sets-div'; thirdDiv3.textContent='Reps:'
    let setInput = document.createElement('input'); setInput.id = 'set-rep-num'; setInput.type = 'number';
    innerDiv3.appendChild(thirdDiv3); innerDiv3.appendChild(setInput)
    let innerDiv4 = document.createElement('div'); innerDiv4.id = 'button-div';
    let button = document.createElement('button'); button.id = 'delete-set';button.textContent = 'Delete'
    innerDiv4.appendChild(button); button.innerHTML = 'Delete Set'
    div.appendChild(innerDiv1); div.appendChild(innerDiv2); div.appendChild(innerDiv3); div.appendChild(innerDiv4)
    let add = document.getElementById(`add-set`);
    add.appendChild(div)
    let name = document.getElementById('exercise-name').innerHTML.replace(/ /g, "_")
    count++;
    let setBody = {
        exerciseName: name,
        set: count
    }
    axios.post(`${URL}/add-set`, setBody).catch(err => console.log(err))
    axios.post(`${URL}/get-set`, setBody).catch(err => console.log(err))
}

// document.querySelector('body').addEventListener('change', addWeight)
// function addWeight(e){
//     let weight = document.querySelector('.set-weight-num')
//     let name = document.querySelector('.exercise-name').innerHTML.replace(/ /g, "_")
//     if(e.target === weight){
//         console.log(weight.value)
//         let body = {
//             weight: weight.value,
//             exerciseName: name
//         }
//         axios.post(`${URL}/add-weight`, body)
//             .then(res => {
//                 console.log(res.data)
//             }).catch(err => console.log(err))
//     }
// }

document.querySelector('body').addEventListener('change', addRep)
function addRep(e){
    let rep = document.querySelector('.set-rep-num')
    if(e.target === rep){
        console.log(rep.value)
    }
}

finish.addEventListener('click', finishFunc);
function finishFunc(){
    // document.getElementById('modal-overlay').style.display = 'block'
    // document.getElementById('cancel-btn').addEventListener('click', ()=>{
    //     document.getElementById('modal-overlay').style.display = 'none'
    // })
    // document.getElementById('save-workout').addEventListener('click', ()=>{
    //     let set = document.getElementById('set-set-count')
    //     let weight = document.getElementById('set-weight-num')
    //     let reps = document.getElementById('set-rep-num')
    //     let exercise = document.getElementById('exercise-name')
    //     console.log(set.innerHTML, weight.value, reps.value, exercise.innerHTML)
    //
    // })
}





